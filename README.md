# Streaming amazing
Aplicativo de streaming de vídeos, consumindo API do Youtube. 
Pode visualizar na home os principais vídeos em alta e os canais em que a pessoa está inscrita. Possui tela para os vídeos ao vivo  por fim visualizar o perfil do usuário.


## Feature
- React Query versão 5 introduziu combine
- Para funcionar corretamente, o ideal é usar na queryKey o próprio campo que deseja fazer o loop, repare que no exemplo eu transformo os ids dos canais e o uso ele no array do queryKey.
- Combine excelente quando precisar fazer um loop em um certo dado para pesquisar outro, por exemplo, tenho uma lista de vídeos e quero consultar quem postou, esses vídeos eram pesquisados em outro endpoint pelo id
- Neste caso de uso  uma requisição depende da outra, é interessante usar o enabled para garantir que ela estará disponível apenas após a outra dar sucesso.

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
- Para realizar login social precisa definir os escopos, este [article](https://dev.to/suyashdev/google-authsignin-in-react-native-without-firebase-43n) pode auxiliar para configurar toda a etapa.
- No Android precisamos gerar a chave webClientId.
- No [IOS](https://chaim-zalmy-muskal.medium.com/hi-6d328bbd550f) e bem mais simples toda configuração.
- Nesta [seção](https://developers.google.com/youtube/v3/guides/auth/client-side-web-apps?hl=pt-br) pode encontrar os escopos.
- Para aplicativos que ainda não subiram para google play  são considerados testes, então precisa ir ao console do google e colocar os emails de teste
- Quando publicar, estará disponível selecionar os escopos e ficará aberto para qualquer um.

```typescript

export default function useUserViewModel(): IUseUserViewModel {
  const store = useUserAuthenticationStore(
    state => ({ update: state.updateUser, authentication: state.user })
  )
  const { data: dataSubscription, isLoading: isLoadingDataSubscription } = useSubscriptionService()
  const { refetch: refetchChannel, isLoading: isLoadingChannel, channelId: channelIdService } = useChannelService()
  const { data: dataPlayListSubscription, isLoading: isLoadingSubscription, refetch, channelId: channelIdSubscription } = usePlayListChannelSubscriptionService()
  const [isLoadingLogin, setIsLoadingLogin] = useState(true)
  const [channel, setChannel] = useState({} as ChannelModel)


  useEffect(() => {

    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/youtube.force-ssl', 'https://www.googleapis.com/auth/youtube.channel-memberships.creator', 'https://www.googleapis.com/auth/youtube'],
      webClientId: WEB_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      offlineAccess: true,
      profileImageSize: 120,
    });


    handleIsSignIn()

  }, [])


  async function handleIsSignIn() {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn()
      if (isSignedIn) {
        const currentUser = await GoogleSignin.getCurrentUser()
        const userInfo = currentUser === null ? await GoogleSignin.signInSilently() : currentUser
        const token = await GoogleSignin.getTokens()
        const user: UserModel = {
          givenName: userInfo.user.givenName ?? userInfo.user.name,
          photo: userInfo.user.photo,
          email: userInfo.user.email

        }
        store.update({ idToken: token.accessToken, user })
      }
    } finally {
      setIsLoadingLogin(false)
    }

  }


  function handleSearchChannel(channelId: string) {
    channelIdService.current = channelId
    refetchChannel().then(it => {
      if (it.data != null) {
        setChannel(it.data)
      }
    })
  }




  async function handleLogin() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn()
      const token = await GoogleSignin.getTokens()
      const user: UserModel = {
        givenName: userInfo.user.givenName ?? userInfo.user.name,
        photo: userInfo.user.photo,
        email: userInfo.user.email

      }
      store.update({ idToken: token.accessToken, user: user })
    } catch (error: unknown) {
      if (error instanceof Error && error.message === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("sem play services disponivel")
      } else if (error instanceof Error) {
        console.error(error.message)
      }

    }
  }

  async function handleSingOut() {
    try {
      await GoogleSignin.signOut()
      await GoogleSignin.revokeAccess()
      const user: UserModel = {
        givenName: null,
        photo: null,
        email: ""

      }
      store.update({ idToken: null, user: user })
    } catch (error) {
      console.log(error)
    }
  }


  function handleWithChannelSubscription(_channelId: string) {
    channelIdSubscription.current = _channelId
    refetch()
  }

  return {
    handleLogin,
    dataSubscription,
    user: store.authentication,
    isLoadingDataSubscription,
    isLoadingLogin,
    handleSingOut,
    handleWithChannelSubscription,
    dataPlayListSubscription,
    isLoadingSubscription,
    handleSearchChannel,
    channel,
    isLoadingChannel,

  }

}


```







