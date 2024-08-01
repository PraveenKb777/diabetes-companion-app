import {
  RouteProp,
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackNavigation} from '../Stack';
import {EditItemsSvg} from '../assets/Svg';
import BackButtonHeader from '../components/BackButtonHeader';
import CustomButton from '../components/CustomButton';
import Loading from '../components/Loading';
import {useAppDispatch, useAppSelector} from '../redux/hooks/hooks';
import {resetState} from '../redux/slice/cmpSlice';
import auth from '../utils/auth';
import {IFood, MEALS_HEADING} from './CaloriesWiseList';
type ParamList = {
  Details: {
    id?: string;
    latest?: boolean;
  };
};
const YourCaloricMenu = () => {
  const [load, setLoad] = useState(false);
  const [pageLoad, setPageLoad] = useState(false);
  const [totals, setTotals] = useState({
    energy_kcal: 0,
    carbohydrate_g: 0,
    protein_g: 0,
    fat_g: 0,
    fiber_g: 0,
  });
  const [selectedItems, setSelectedItems] = useState<{
    [key: number]: (IFood | undefined)[];
  }>();
  const navigation = useNavigation<StackNavigation>();
  const {params} = useRoute<RouteProp<ParamList, 'Details'>>();
  const items = useAppSelector(e => e.cmpReducer.selectedItems);

  useEffect(() => {
    setPageLoad(true);
    const isLatest = params?.latest;
    const id = params?.id;
    if (isLatest) {
      getValueForLatest();
      return;
    }

    if (id) {
      getValueById(id);
      return;
    }

    setSelectedItems(items);
    setTimeout(() => {
      setPageLoad(false);
    });
  }, [items, params?.id, params?.latest]);

  const getValueForLatest = async () => {
    setPageLoad(true);
    try {
      const res = await auth.get('/cmp/latest');
      const data = await res.data;
      const {result} = data;
      const cmp_data = JSON.parse(result.cmp_data);
      setSelectedItems(cmp_data);
    } catch (error: any) {
      //console.log(error);
      const msg = error.response.data.message || 'Something went wrong';
      ToastAndroid.show(msg, ToastAndroid.SHORT);
      navigation.goBack();
    } finally {
      setPageLoad(false);
    }
  };
  const getValueById = async (id: string) => {
    setPageLoad(true);
    try {
      const res = await auth.get(`/cmp/${id}`);
      const data = await res.data;
      const {result} = data;
      const cmp_data = JSON.parse(result.cmp_data);
      setSelectedItems(cmp_data);
    } catch (error: any) {
      //console.log(error);

      const msg = error.response.data.message || 'Something went wrong';
      ToastAndroid.show(msg, ToastAndroid.SHORT);
      navigation.goBack();
    } finally {
      setPageLoad(false);
    }
  };

  useEffect(() => {
    let energy_kcal = 0;
    let carbohydrate_g = 0;
    let protein_g = 0;
    let fat_g = 0;
    let fiber_g = 0;

    if (selectedItems) {
      for (let i = 0; i <= MEALS_HEADING.length; i++) {
        for (let subItems of selectedItems[i] || []) {
          energy_kcal += subItems?.energy_kcal || 0;
          carbohydrate_g += subItems?.carbohydrate_g || 0;
          protein_g += subItems?.protein_g || 0;
          fat_g += subItems?.fat_g || 0;
          fiber_g += subItems?.fiber_g || 0;
        }
      }
    }

    setTotals({
      carbohydrate_g: +parseFloat(carbohydrate_g + '').toFixed(2),
      energy_kcal: +parseFloat(energy_kcal + '').toFixed(2),
      fat_g: +parseFloat(fat_g + '').toFixed(2),
      fiber_g: +parseFloat(fiber_g + '').toFixed(2),
      protein_g: +parseFloat(protein_g + '').toFixed(2),
    });
  }, [selectedItems]);
  const dispatch = useAppDispatch();
  const onPressSave = async () => {
    setLoad(true);
    try {
      const res = await auth.post('/cmp', {cmp_data: selectedItems});
      //console.log(await res.data);
      dispatch(resetState());
      ToastAndroid.show(
        'Your Meal plan has been recorded successfully',
        ToastAndroid.SHORT,
      );
      navigation.reset({
        index: 0,
        routes: [{name: 'HomeScreen', state: {routes: [{name: 'CMP'}]}}],
      });
    } catch (error: any) {
      //console.log(error);
      const msg = error.response.data.message || 'Something went wrong';
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } finally {
      setLoad(false);
    }
  };

  if (pageLoad) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BackButtonHeader heading="Your caloric menu" />
      {params?.id || params?.latest ? null : (
        <View
          style={{
            paddingHorizontal: 16,

            marginVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{width: '60%'}}>
            View and customize your menu based on your caloric value and
            preferences.
          </Text>
          <CustomButton label="Save" onPress={onPressSave} load={load} />
        </View>
      )}
      <ScrollView contentContainerStyle={{padding: 16}}>
        {MEALS_HEADING.map((e, i) => {
          return (
            <View
              key={e.head + i}
              style={{
                borderWidth: 1,
                borderColor: 'rgba(0, 0, 0, 0.20)',
                borderRadius: 5,
                marginVertical: 5,
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
                    {i + 1}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#000',
                      marginLeft: 16,
                    }}>
                    {e.head}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#000',
                      padding: 5,
                      borderWidth: 1,
                      borderColor: '#9D9D9D',
                      textAlign: 'center',
                      marginRight: 10,
                      width: 80,
                    }}>
                    {e.time}
                  </Text>
                  {params?.id || params?.latest ? null : (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.dispatch(
                          StackActions.replace('CaloriesWiseListScreen', {
                            index: i,
                          }),
                        )
                      }>
                      <EditItemsSvg />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  width: '100%',
                  marginTop: 10,
                  backgroundColor: 'rgba(0, 0, 0, 0.20)',
                }}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text
                  style={{
                    color: '#000',
                    width: '40%',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Items
                </Text>
                <Text
                  style={{
                    color: '#000',
                    width: '30%',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Qty
                </Text>
                <Text
                  style={{
                    color: '#000',
                    width: '30%',
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'right',
                  }}>
                  Kcal
                </Text>
              </View>
              {selectedItems
                ? selectedItems[i].map(foodItem =>
                    foodItem ? (
                      <View
                        key={foodItem.id + 'list items'}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            width: '40%',
                          }}>
                          {foodItem.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            width: '30%',
                            textAlign: 'left',
                          }}>
                          {foodItem.qty}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            width: '30%',
                            textAlign: 'right',
                          }}>
                          {foodItem.energy_kcal}
                        </Text>
                      </View>
                    ) : null,
                  )
                : null}
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.20)',
          borderRadius: 5,
          marginVertical: 5,
          padding: 16,
          margin: 16,
        }}>
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          Total Nutritional Content
        </Text>
        <View
          style={{
            height: 1,
            width: '100%',
            marginTop: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.20)',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              width: '40%',
              color: '#000',
            }}>
            Energy
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',

              textAlign: 'right',
            }}>
            {totals.energy_kcal} Kcal
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              width: '40%',
              color: '#000',
            }}>
            Carbohydrate
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',

              textAlign: 'right',
            }}>
            {totals.carbohydrate_g} gm
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              width: '40%',
              color: '#000',
            }}>
            Protein
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',

              textAlign: 'right',
            }}>
            {totals.protein_g} gm
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              width: '40%',
              color: '#000',
            }}>
            Total fat
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',

              textAlign: 'right',
            }}>
            {totals.fat_g} gm
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              width: '40%',
              color: '#000',
            }}>
            Total fiber
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',

              textAlign: 'right',
            }}>
            {totals.fiber_g} gm
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default YourCaloricMenu;
