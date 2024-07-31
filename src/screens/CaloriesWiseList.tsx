import {
  Dimensions,
  Image,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks/hooks';
import {CALORIC_AMOUNTS} from './ChooseYourCaloricValue';
import BackButtonHeader from '../components/BackButtonHeader';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {ArrowIndicator, NextArrow} from '../assets/Svg';
import MENU from '../datas/menu';
import {useDispatch} from 'react-redux';
import {setSelectedItem} from '../redux/slice/cmpSlice';
const COUNT = Array(7)
  .fill(0)
  .map((_, i) => i);

const MEALS_HEADING = [
  {head: 'Early Morning', time: '6 - 7 AM'},
  {head: 'Breakfast', time: '8 - 9 AM'},
  {head: 'Mid Morning', time: '11 AM'},
  {head: 'lunch', time: '1 - 2 PM'},
  {head: 'Tea Time', time: '4 - 5 PM'},
  {head: 'Dinner', time: '7 - 8 PM'},
  {head: 'Bed Time', time: '9 - 10 PM'},
];
interface CurrentMealIndicatorProps {
  currentIndex?: number;
}

export interface IFood {
  id: string;
  name: string;
  qty: string;
  energy_kcal: number;
  carbohydrate_g: number;
  protein_g: number;
  fat_g: number;
  fiber_g: number;
}

const FoodListSelection: FC<{
  timingIndex?: number;
  itemIndex?: number;
  item: IFood;
}> = ({timingIndex = 0, itemIndex = 0, item}) => {
  const dispatch = useAppDispatch();
  const {selectedItems} = useAppSelector(e => e.cmpReducer);
  const isSelected = selectedItems[timingIndex][itemIndex]?.id === item.id;
  return (
    <TouchableOpacity
      onPress={() =>
        dispatch(setSelectedItem({timingIndex, itemIndex, isSelected, item}))
      }
      style={[
        {
          borderWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.20)',
          paddingHorizontal: 10,
          margin: 3,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 5,
          borderRadius: 3,
        },
        isSelected
          ? {backgroundColor: '#0075FF', borderColor: 'rgba(0, 0, 0, 0.20)'}
          : {},
      ]}>
      <Text
        style={[
          {
            fontSize: 16,
            fontWeight: 'bold',
            fontStyle: 'italic',
            color: '#000',
          },
          isSelected ? {color: '#fFF'} : {},
        ]}>
        {item.name}
        {'    '}
      </Text>
      <Text
        style={[
          {
            fontStyle: 'normal',
            backgroundColor: '#000B211A',
            width: 20,
            height: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
            borderRadius: 100,
            color: '#000',
            fontSize: 16,
          },
          isSelected ? {backgroundColor: '#fff'} : {},
        ]}>
        {isSelected ? '-' : '+'}
      </Text>
    </TouchableOpacity>
  );
};

const FoodsRenderItems: FC<{
  item: {
    name: string;
    uuid: string;
    foods: IFood[];
  }[];
  timingIndex?: number;
  itemIndex?: number;
}> = ({item, timingIndex = 0, itemIndex = 0}) => {
  const [foodList, setFoodList] = useState<(typeof item)[0]>();
  return (
    <>
      <ScrollView horizontal style={{marginVertical: 10}}>
        {item?.map(subMain => (
          <TouchableOpacity
            onPress={() =>
              !(foodList?.name === subMain.name)
                ? setFoodList(subMain)
                : setFoodList(undefined)
            }
            style={{marginRight: 10, maxWidth: (width * 32) / 100}}>
            <Image
              src="https://www.colive.com/blog/wp-content/uploads/2024/01/Untitled-design-56.png"
              style={{
                height: (width * 30) / 100,
                aspectRatio: 1,
                borderRadius: 5,
                borderColor: 'rgba(0, 0, 0, .20)',
                borderWidth: 1,
                marginBottom: 10,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#000',
              }}>
              {subMain.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {foodList &&
          foodList.foods?.map((e, i) => (
            <FoodListSelection
              key={e.id + i}
              timingIndex={timingIndex}
              itemIndex={itemIndex}
              item={e}
            />
          ))}
      </View>
    </>
  );
};

const CurrentMealIndicator: FC<CurrentMealIndicatorProps> = ({
  currentIndex,
}) => {
  const renderItem: ListRenderItem<(typeof COUNT)[0]> = ({index, item}) => {
    return (
      <View style={styles.cmiValMainCont}>
        <View style={styles.cmiArrowTextCont}>
          <View>
            <Text
              style={[
                styles.cmiValText,
                currentIndex === index
                  ? {backgroundColor: '#0075FF', color: '#fff'}
                  : {},
              ]}>
              {item + 1}
            </Text>
          </View>
          {!(COUNT.length === index + 1) ? (
            <ArrowIndicator style={{marginRight: 10}} />
          ) : null}
        </View>
      </View>
    );
  };

  const flatListRef = useRef<FlatList<number> | null>(null);

  const scrollTo = useCallback(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: currentIndex ? currentIndex : 0,
        animated: true,
        viewOffset: 30,
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    scrollTo();
  }, [scrollTo]);

  return (
    <FlatList
      horizontal
      style={{flexGrow: 0}}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{padding: 10}}
      renderItem={renderItem}
      data={COUNT}
      keyExtractor={(e, i) => '' + e + i}
      ref={flatListRef}
    />
  );
};
const {width, height} = Dimensions.get('window');
const CaloriesWiseList = () => {
  const selectedItem = useAppSelector(e => {
    const id = e.cmpReducer.selectedCalories;

    const item = CALORIC_AMOUNTS.find(i => i.id === id);
    return item;
  });

  const {selectedItems} = useAppSelector(e => e.cmpReducer);
  console.log('>>>>', selectedItems);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const renderItem: ListRenderItem<(typeof MENU)[0]> = ({index, item}) => {
    const headingItem = MEALS_HEADING[index];
    console.log(
      '>>>>',
      selectedItems[index].map((e, i) => {
        return e?.name;
      }),
    );
    return (
      <View style={{width, padding: 16, height: '100%'}}>
        <ScrollView
          nestedScrollEnabled
          style={{
            flex: 1,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'rgba(0, 11, 33, 0.20)',
              padding: 16,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    backgroundColor: '#000',
                    textAlign: 'center',
                    height: 40,
                    width: 40,
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#fff',
                    textAlignVertical: 'center',
                    borderRadius: 100,
                  }}>
                  {index + 1}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#000',
                    marginLeft: 16,
                  }}>
                  {headingItem.head}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#000',
                  padding: 5,
                  borderWidth: 1,
                  borderColor: '#9D9D9D',
                  textAlign: 'center',
                }}>
                {headingItem.time}
              </Text>
            </View>
            {item.map((minlist, i) => (
              <FoodsRenderItems
                item={minlist}
                timingIndex={index}
                itemIndex={i}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  const handleNext = () => {
    setSelectedIndex(_ => {
      if (selectedIndex === MENU.length - 1) {
        return selectedIndex;
      }
      const nextIndex = selectedIndex + 1;
      flatListRef.current?.scrollToIndex({animated: true, index: nextIndex});
      return nextIndex;
    });
  };
  const handlePrev = () => {
    setSelectedIndex(_ => {
      if (selectedIndex === 0) {
        return selectedIndex;
      }
      const nextPrev = selectedIndex - 1;
      flatListRef.current?.scrollToIndex({animated: true, index: nextPrev});
      return nextPrev;
    });
  };

  const flatListRef = React.useRef<FlatList<
    {name: string; uuid: string; foods: IFood[]}[][]
  > | null>(null);
  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButtonHeader
        heading={`Caloric Menu Planner - \n${selectedItem?.val}`}
      />
      <CurrentMealIndicator currentIndex={selectedIndex} />
      <FlatList
        style={{flex: 1}}
        pagingEnabled
        horizontal
        data={MENU}
        ref={flatListRef}
        renderItem={renderItem}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      />
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          justifyContent: 'space-between',
          width: '100%',
          paddingHorizontal: 26,
        }}>
        <TouchableOpacity
          style={[
            {
              backgroundColor: selectedIndex === 0 ? 'grey' : '#000',
              height: 40,
              width: 40,
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
          <NextArrow height={20} width={20} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              backgroundColor:
                MENU.length - 1 === selectedIndex ? 'grey' : '#000',
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 1000,

              alignSelf: 'flex-end',
              marginBottom: 20,
            },
          ]}
          onPress={handleNext}>
          <NextArrow height={20} width={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CaloriesWiseList;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cmiValMainCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cmiValText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 11, 33, 0.05)',
    width: 50,
    marginRight: 10,
    paddingVertical: 3,
    borderRadius: 100,
    fontWeight: 'bold',
  },
  cmiArrowTextCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
