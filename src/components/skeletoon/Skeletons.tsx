import { FlatList } from "react-native-gesture-handler"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"


export const SkeletonHomeScreen = () => {

  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item >
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" gap={10} paddingHorizontal={13} >
          <SkeletonPlaceholder.Item borderRadius={30} width={60} height={60} />
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" gap={5}>
              <TextSkeleton />
              <SkeletonPlaceholder.Item width={20} height={20} borderRadius={10} />
            </SkeletonPlaceholder.Item>
            <TextSkeleton />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
        <TextSkeleton />
        <FlatList
          data={[...Array(10).map(it => it)]}
          horizontal
          renderItem={({ item }) => <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item borderRadius={30} height={60} width={60} />
          </SkeletonPlaceholder.Item>}
        />
        <FlatList
          data={[...Array(10).map(it => it)]}
          renderItem={({ item }) => <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item borderRadius={15} height={180} width="100%" />
            <SkeletonPlaceholder.Item width={30} height={30} borderRadius={15} />
            <TextSkeleton />
          </SkeletonPlaceholder.Item>}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

export const TextSkeleton = () => {
  return (
    <SkeletonPlaceholder.Item width="100%" height={25} />
  )
}

export const PlayVideoSkeleton = () => {

  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item flex={1} height="100%" width="100%" >
        <SkeletonPlaceholder.Item width="100%" height={140} />
        <TextSkeleton />
        <SkeletonPlaceholder.Item flexDirection="row" gap={15} alignItems="center" justifyContent="flex-start">
          <TextSkeleton />
          <TextSkeleton />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item flexDirection="row" gap={15} alignItems="center" justifyContent="flex-start">
          <SkeletonPlaceholder.Item width={40} height={40} borderRadius={20} />
          <TextSkeleton />
          <TextSkeleton />
        </SkeletonPlaceholder.Item>
        {[...Array(10).map(it => <TextSkeleton />)]}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )
}

export const DataSubscriptionSkeleton = () => {

  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item flex={1} height="100%" width="100%">
        <SkeletonPlaceholder.Item flexDirection="row" gap={15} justifyContent="center" alignItems="center" >
          <SkeletonPlaceholder.Item width={30} height={30} borderRadius={15} />
          <TextSkeleton />
        </SkeletonPlaceholder.Item>
        <FlatList
          data={[...Array(10).map(it => it)]}
          renderItem={({ item }) => <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item borderRadius={15} height={180} width="100%" />
            <SkeletonPlaceholder.Item width={30} height={30} borderRadius={15} />
            <TextSkeleton />
          </SkeletonPlaceholder.Item>}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  )

}

export const LiveSkeleton = () => {

  return (
    <SkeletonPlaceholder borderRadius={4}>
      <FlatList
        data={[...Array(10).map(it => it)]}
        renderItem={({ item }) => <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item borderRadius={15} height={180} width="100%" />
          <SkeletonPlaceholder.Item width={30} height={30} borderRadius={15} />
          <TextSkeleton />
        </SkeletonPlaceholder.Item>}
      />
    </SkeletonPlaceholder>
  )

}