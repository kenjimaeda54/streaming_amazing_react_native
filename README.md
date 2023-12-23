# Streaming amazing
Aplicativo de streaming de videos consumindo API do Youtube. Pode visulizar na home  os princiapis videos em alta, tambem visualizar os ao vivo e por fim o profile da pessoa logada.
E possivel tambem visualizar um carrosel com  os respectivos canais que pessoa esta inscrita

## Feature
- React Query versao 5 introduziu combine
- Para funcionar corretamnte o ideal e usar o proprio campo que deseja fazer o loop dentro do array da queryKey
- Combine excelente quando precisar fazer um loop em um certo dado para pesquisar outro, por exemplo tenho uma lista de videos e quero consultar quem postou, esses videos era persquisado em outro endpoint pelo id
- Reapra que retornei os ids dos canais e depois usei um loop para trazer os canais respecitivos
- Neste caso ja qeu uma requisicao que dpenede da outra e interessante usar o enabled para garantir que ela estara disponivel apenas apos a outra dar sucesso

  ```typescript

   const { data: dataSearchVideo = {
    items: [],
    kind: "",
    etag: "",
    nextPageToken: "",
    regionCode: "",
    pageInfo: {
      totalResults: 0,
      resultsPerPage: 0
    }
  } as SearchVideoModel, isSuccess: successSearchVideo } = useQuery({
    queryKey: [Constants.searchVideos],
    queryFn: ({ signal }) => searchVideo(signal),
  })



  const ids = dataSearchVideo.items.map(it => it.snippet.channelId)
  const combineQueries = useQueries({
    queries: ids.map(it => {
      return {
        queryKey: [Constants.channelVideos, `${it}`],
        queryFn: () => fetchSearchChannel(it),
        enabled: successSearchVideo,
      }
    }),
    combine(results) {
      return ({
        data: dataSearchVideo.items.map(video => {
          const findChannel = results.find(it => it.data?.items[0].id === video.snippet.channelId)

          if (findChannel !== undefined) {
            const { data } = findChannel
            return {
              id: data?.items[0].id,
              thumbProfileChannel: data?.items[0].snippet.thumbnails.medium.url,
              thumbVideo: video.snippet.thumbnails.high.url,
              isSubscribed: false,
              publishedVideo: video.snippet.publishedAt,
              titleVideo: video.snippet.title,
              descriptionVideo: video.snippet.description,
              videoId: video.id.videoId,
              subscriberCountChannel: data?.items[0].statistics.subscriberCount,
              channelId: video.snippet.channelId
            } as VideosWithChannelModel

          } else {
            return {} as VideosWithChannelModel
          }

        }),
        isSuccess: results.some(it => it.isSuccess),
        isLoading: results.some(it => it.isLoading)
      })
    },
  })



return {
    channelWithVideo: combineQueries.data,
    isLoading: combineQueries.isLoading,
    isSuccess: combineQueries.isSuccess
  }



  ```


##




