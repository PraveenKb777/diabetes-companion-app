import {R2_URL} from '@env';
import React, {FC, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DChart from '../diateryChart';
import {DGHeading} from '../screens/DiabetesGuide';
const HEADING_INCLUDS = ['Liberally', 'Moderately', 'Excluded'];
const COLORS_HEADING = [
  'rgba(95, 231, 117, 0.50)',
  'rgba(254, 163, 98, 0.50)',
  'rgba(229, 28, 28, 0.50)',
];
const {width} = Dimensions.get('window');

const RenderFDText: FC<{label?: string; val?: any; unit?: string}> = ({
  label,
  val,
  unit,
}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}>
      <Text style={{fontSize: 12, fontStyle: 'italic', color: '#000'}}>
        {label}
      </Text>
      <Text style={{fontSize: 12, fontStyle: 'italic'}}>
        {!val ? `${val}` : val}
        {unit}
      </Text>
    </View>
  );
};
const FoodDescCard: FC<{
  item: {
    Name?: string;
    'Energy (Kcal)'?: any;
    'CHO (gm)'?: any;
    'Protein (gm)'?: any;
    'Total Fat (gm)'?: any;
    'Total  Fiber (gm)'?: any;
    'Glycemic Index'?: any;
    img?: string;
  };
}> = ({item}) => {
  if (!item) {
    return null;
  }

  return (
    <View style={styles.foodDescCardMain}>
      <Image
        src={`${R2_URL}dItemsPicks/${item?.img}`}
        style={{
          width: '100%',
          aspectRatio: 16 / 9,
          objectFit: 'fill',
          borderRadius: 10,
          backgroundColor: '#fff',
        }}
      />
      <View style={{height: 10}} />
      <Text style={styles.fdcHead}>
        {item?.Name} <Text style={styles.fdcmeasure}>{'(100 gm)'}</Text>
      </Text>
      <View style={{height: 10}} />
      <RenderFDText label="Energy" val={item['Energy (Kcal)']} unit=" (Kcal)" />
      <RenderFDText label="Carbohydrate" val={item['CHO (gm)']} unit=" (gm)" />
      <RenderFDText label="Protein" val={item['Protein (gm)']} unit=" (gm)" />
      <RenderFDText
        label="Total Fat"
        val={item['Total Fat (gm)']}
        unit=" (gm)"
      />
      <RenderFDText
        label="Total Fiber"
        val={item['Total  Fiber (gm)']}
        unit=" (gm)"
      />
      <RenderFDText
        label="Glycemic Index"
        val={item['Glycemic Index']}
        unit=""
      />
    </View>
  );
};

const DChartHead = Object.keys(DChart);

const FoodsIncluded = () => {
  const [currItem, setCurrItem] = useState(0);

  const [list, setList] = useState<any[]>([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    setLoad(true);
    setList(Object.keys(DChart[DChartHead[currItem]]));
    setTimeout(() => {
      setLoad(false);
    });
  }, [currItem]);
  if (load) {
    return (
      <View
        style={{
          width: '100%',
          aspectRatio: 1 / 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} color={'#0075FF'} />
      </View>
    );
  }
  return (
    <View style={{marginBottom: 20}}>
      <View style={{width: '100%', flexDirection: 'row'}}>
        {HEADING_INCLUDS.map((e, i) => (
          <TouchableOpacity
            onPress={() => setCurrItem(i)}
            style={{
              width: `${100 / HEADING_INCLUDS.length}%`,
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#000',
              borderWidth: 1,
              backgroundColor: currItem === i ? '#000' : '#fff',
              marginBottom: 20,
            }}>
            <Text style={{color: currItem !== i ? '#000' : '#fff'}}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{backgroundColor: COLORS_HEADING[currItem], padding: 16}}>
        {list?.map((e, i) => {
          return (
            <>
              <DGHeading head={e} key={e + i} />
              <FlatList
                data={DChart[DChartHead[currItem]][e] || []}
                horizontal
                keyExtractor={item => {
                  return e + i + 2 + JSON.stringify(item);
                }}
                nestedScrollEnabled
                renderItem={({item}) => {
                  return <FoodDescCard item={item} />;
                }}
              />
            </>
          );
        })}
      </View>
    </View>
  );
};

export default FoodsIncluded;

const styles = StyleSheet.create({
  foodDescCardMain: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    width: (width * 45) / 100,
    marginHorizontal: 5,
  },
  fdcHead: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  fdcmeasure: {
    color: 'grey',
    fontWeight: '400',
    fontStyle: 'italic',
    fontSize: 12,
  },
});
