import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../redux/hooks/hooks';
import {resetLunchSelectedItem, setIsVariety} from '../redux/slice/cmpSlice';
import {FoodsRenderItems, MEALS_HEADING} from '../screens/CaloriesWiseList';
const {height} = Dimensions.get('window');

//  v - rice --

const LunchComponent: FC<{
  currIndex: number;
  item: {
    name: string;
    img: string;
    uuid: string;
    foods: {
      id: string;
      name: string;
      qty: string;
      energy_kcal: number;
      carbohydrate_g: number;
      protein_g: number;
      fat_g: number;
      fiber_g: number;
    }[];
  }[][];
  changeNext: (nextEnable: boolean) => void;
}> = ({item, changeNext, currIndex}) => {
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const {selectedItems, isVariety} = useAppSelector(e => e.cmpReducer);
  const [foodList, setFoodList] = useState<typeof item>();
  const headingItem = MEALS_HEADING[3];
  const selectedItemId = useMemo(
    () => selectedItems[3][0]?.id || undefined,
    [selectedItems],
  );
  // console.log('>>>', selectedItemId);

  const newData = useMemo(() => [...item], [item]);

  const mainCapableArray = useMemo(() => newData[0], [newData]);

  const varaityRiceList = useMemo(
    () => mainCapableArray[1].foods.map(e => e.id),
    [mainCapableArray],
  );

  useEffect(() => {
    const isAvilableVariety = varaityRiceList.includes(selectedItemId || '');
    dispatch(setIsVariety(isAvilableVariety));
    let subCapableArray = newData.slice(1);
    if (isAvilableVariety) {
      subCapableArray = [subCapableArray[3]];
    }
    setFoodList(subCapableArray);
    // console.log(isAvilableVariety);
  }, [newData, selectedItemId, varaityRiceList]);
  //   console.log(newData);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    dispatch(resetLunchSelectedItem());
  }, [isVariety]);
  useEffect(() => {
    let total = 1;
    let avilable = 0;

    foodList?.forEach(e => e && total++);
    selectedItems[3].forEach(e => {
      e && avilable++;
    });
    // console.log(total, avilable);
    if (total === avilable) {
      // console.log('got in');
      changeNext(true);
    } else {
      changeNext(false);
    }
    setCount(avilable);
  }, [changeNext, foodList, selectedItems, currIndex]);
  return (
    <>
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
                {4}
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
          <FoodsRenderItems
            item={mainCapableArray}
            timingIndex={3}
            itemIndex={0}
          />
          {foodList?.map((minlist, i) => (
            <FoodsRenderItems
              key={'' + i + i + i}
              item={minlist}
              timingIndex={3}
              itemIndex={i + 1}
            />
          ))}
        </View>
      </ScrollView>

      <ScrollView
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.20)',
          borderRadius: 5,
          marginTop: 10,
          maxHeight: (height * 30) / 100,
          flexGrow: 0,
        }}
        contentContainerStyle={{padding: 16}}>
        <View
          style={{
            width: 4,
            height: '110%',
            backgroundColor: '#0075FF',
            position: 'absolute',
            top: 16,
            left: 5,
            borderRadius: 100,
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
            Items selected ({count}/{foodList?.length + 1})
          </Text>
          <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold'}}>
            Qty
          </Text>
        </View>
        {selectedItems[3].map(e =>
          e ? (
            <View
              key={e.id + 'list items'}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  maxWidth: '70%',
                }}>
                {e.name}
              </Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>{e.qty}</Text>
            </View>
          ) : null,
        )}
      </ScrollView>
    </>
  );
};

export default LunchComponent;
