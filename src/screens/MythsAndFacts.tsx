import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {NextArrow} from '../assets/Svg';
import BackButtonHeader from '../components/BackButtonHeader';
import MythsAndFactsCard, {
  IMythAndFactItem,
} from '../components/MythsAndFactsCard';
import {MythFactList} from './Home';

const MythsAndFacts = () => {
  const flatListRef = useRef<FlatList<IMythAndFactItem>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem: ListRenderItem<IMythAndFactItem> = ({item}) => {
    return (
      <View style={[styles.itemContainer]}>
        <MythsAndFactsCard item={item} />
      </View>
    );
  };
  const handleNext = () => {
    setCurrentIndex(_ => {
      if (currentIndex === MythFactList.length - 1) {
        return currentIndex;
      }
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({animated: true, index: nextIndex});
      return nextIndex;
    });
  };
  const handlePrev = () => {
    setCurrentIndex(_ => {
      if (currentIndex === 0) {
        return currentIndex;
      }
      const nextPrev = currentIndex - 1;
      flatListRef.current?.scrollToIndex({animated: true, index: nextPrev});
      return nextPrev;
    });
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BackButtonHeader heading={'Myths and Facts of\nDiabetes'} />
      <View style={{height: 10}} />
      <FlatList
        ref={flatListRef}
        data={MythFactList}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
      <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
        <TouchableOpacity
          style={[
            {
              backgroundColor: currentIndex === 0 ? 'grey' : '#000',
              height: 60,
              width: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 1000,
              marginRight: 26,
              alignSelf: 'flex-end',
              marginBottom: 20,
              transform: [{rotate: '180deg'}],
            },
          ]}
          onPress={handlePrev}>
          <NextArrow height={30} width={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              backgroundColor:
                MythFactList.length - 1 === currentIndex ? 'grey' : '#000',
              height: 60,
              width: 60,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 1000,
              marginRight: 26,
              alignSelf: 'flex-end',
              marginBottom: 20,
            },
          ]}
          onPress={handleNext}>
          <NextArrow height={30} width={30} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MythsAndFacts;
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  itemContainer: {
    width: width,
    paddingHorizontal: 16,
    flex: 1,
  },
});
