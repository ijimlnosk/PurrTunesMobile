import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {AlbumType} from '../apis/type';
import {useNavigation} from '@react-navigation/native';
import {fetchPopularAlbums} from '../apis/YoutubeAPI';
import {useQuery} from '@tanstack/react-query';
import {HomeNavigationProps} from './type';
import AlbumSearch from '../components/AlbumSearch';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation<HomeNavigationProps>();
  const {
    data: albums = [],
    isLoading,
    isError,
  } = useQuery<AlbumType[], Error>({
    queryKey: ['popularAlbums'],
    queryFn: fetchPopularAlbums,
  });

  const handlePress = (album: AlbumType) => {
    navigation.navigate('PlayerScreen', {album});
  };

  // const onLogout = async () => {
  //   await AsyncStorage.removeItem('authToken');
  // };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-#ff0000">ERROR</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 mt-10">
      {/* <TouchableOpacity onPress={onLogout}>
        <Text>로그아웃</Text>
      </TouchableOpacity> */}
      <AlbumSearch />
      <Text className="text-xl font-bold mb-4">Popular Albums</Text>
      <FlatList
        data={albums}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePress(item)} className="mb-4">
            <View className="flex-row items-center">
              <Image
                source={{uri: item.thumbnail.medium.url}}
                className="w-20 h-20 mr-2.5"
              />
              <View>
                <Text className="font-semibold">{item.title}</Text>
                <Text>{item.channelTitle}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{flexGrow: 1}}
      />
    </View>
  );
};

export default Home;
