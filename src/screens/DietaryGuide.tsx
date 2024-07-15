import {R2_AUDIO_URL, R2_URL} from '@env';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BackButtonHeader from '../components/BackButtonHeader';
import {CarouselItem} from '../components/Carousal';
import DietPrincipalCard from '../components/DietPrincipalCard';
import ModyCard from '../components/ModyCard';
import SympromesOfDiaCard from '../components/SymptomesOfDiaCard';
import {useBottomSheet} from '../context/BottomSheetContext';
import {DGHeading} from './DiabetesGuide';
import FoodsIncluded from '../components/FoodsIncluded';
import Loading from '../components/Loading';
const DPItems: {id: string; img: any; head: string}[] = [
  {
    id: '0931ngagweggweg42',
    img: 'dietaryguidevegies.png',
    head: 'LOW\nCARBOHYDRATES',
  },
  {
    id: '0931ngageqfg42',
    img: 'dietaryguidefish.png',
    head: 'LOW \nFAT',
  },
  {
    id: '0931ngweggweg42',
    img: 'diateryguidetomatogreen.png',
    head: 'HIGH \n FIBER',
  },
  {
    id: '093gweggweg42',
    img: 'diataryguideGreenveg.jpeg',
    head: 'LOW \nGLYCEMIC INDEX',
  },
  {
    id: '0931ngggweg42',
    img: 'dietaryguidevitamins.jpeg',
    head: 'ADEQUATE\nVITAMINS\nAND MINERALS ',
  },
];

const HOME_REMADIES: CarouselItem[] = [
  {
    id: '788hsabdfquybuyfq',
    head: 'Bitter Gourd',
    img: 'dItemsPicks/bittergourd.png',
    desc: 'Consume 1 cup juice in the morning.\nBenefits: Hypoglycemic properties, reduces blood glucose levels.',
    color: '#9BBB59',
  },
  {
    id: '788hsabdfqybuyfq',
    head: 'Country Gooseberry (Keezhanelli)',
    desc: 'Boil 10g paste in 100ml water till reduced to 25ml, drink twice daily.\nBenefits: Effective in diabetes management.',
    color: '#5FB65B',
    img: 'dItemsPicks/keelaneli.png',
  },
  {
    id: '788hsabdfqybufq',
    head: 'Cumin seeds',
    desc: 'Consume 1 teaspoon powder with water twice daily.\nBenefits: Controls blood glucose levels.',
    color: '#5DB18E',
    img: 'dItemsPicks/cumin.png',
  },
  {
    id: '788hsabdfqybuf',
    head: 'Fenugreek seeds',
    desc: 'Soak 10g seeds, consume water on empty stomach.\nBenefits: Reduces carbohydrates absorption, lower blood sugar.',
    color: '#5F9DAC',
    img: 'dItemsPicks/fenugreek.png',
  },
  {
    id: '788hsabdfqybf',
    head: 'Indian Gooseberry (Amla)',
    desc: 'Consume 1-2 daily.\nBenefits: Regulates carbohydrate absorption, improves insulin sensitivity.',
    color: '#626EA7',
    img: 'dItemsPicks/gooseberry.png',
  },
  {
    id: '788hsabdfqyb',
    head: 'Jamun seeds',
    desc: 'Boil 10g seed powder in 100ml water till reduced to one fourth, consume decoction on empty stomach.\nBenefits: Regulates insulin, increase insulin production, lower blood sugar.',
    color: '#8064A2',
    img: 'dItemsPicks/jamunfruit.jpeg',
  },
  {
    id: '788hsadfqyb',
    head: 'Curry leaves',
    desc: 'Manage diabetes with 5-log powder twice/thrice daily.\nBenefits: Stimulates insulin production, reduces blood sugar.',
    color: '#9BBB59',
    img: 'dItemsPicks/curryleaves.png',
  },
  {
    id: '788hsadqyb',
    head: 'Neem Leaves',
    desc: 'Drink 1 cup juice with black pepper on empty stomach for 3 stomach.\nBenefits: Rich in flavonoids, helps manage blood sugar level .',
    color: '#5FB65B',
    img: 'dItemsPicks/neemleaves.jpeg',
  },
  {
    id: '788hsadyb',
    head: 'Guava leaves',
    desc: 'Boil in 10-15 leaves in water, drink decoction after meal.\nBenefits: High in antioxidants, lower blood glucose, reduces insulin resistance.',
    color: '#5DB18E',
    img: 'dItemsPicks/guavaleaves.jpeg',
  },
  {
    id: '788hsadb',
    head: 'Drumstick leaves',
    desc: 'Blend and drink juice of handful of tender leaves every morning.\nBenefits: Controls blood sugar, purifies blood.',
    color: '#5F9DAC',
    img: 'dItemsPicks/drumstickleaves.jpeg',
  },
  {
    id: '788sadb',
    head: 'Cinnamon',
    desc: 'Add 1/2 tsp powder to warm water, drink daily.\nBenefits: Triggers insulin activity, lowers blood sugar levels.',
    color: '#626EA7',
    img: 'dItemsPicks/cinnamon.png',
  },
  {
    id: '788sdb',
    head: 'Aloe vera',
    desc: 'Drink 1 cup unsweetened juice twice daily.\nBenefits: Regulates blood glucose levels, rich in phytosterols.',
    color: '#8064A2',
    img: 'dItemsPicks/alovevera.jpeg',
  },
];

const CRAVE_AND_CUT = [
  {
    img: 'breadsBasketFul.png',
    head: 'Bread and Pasta',
    color: '#E51C1C',
  },
  {
    img: 'vegColorful.png',
    head: 'Vegetables',
    color: '#5FE775',
  },
  {
    img: 'chipsHandfull.png',
    head: 'Salty Foods',
    color: '#E51C1C',
  },
  {
    img: 'fruitsColorful.png',
    head: 'Fruits',
    color: '#5FE775',
  },
  {
    img: 'kfcSpoonfull.png',
    head: 'Oily Foods',
    color: '#E51C1C',
  },
  {
    img: 'vegBoxFul.png',
    head: 'Dark Green Leafy Vegetables',
    color: '#5FE775',
  },
  {
    img: 'candyPlateful.png',
    head: 'Sweet and Sugary\nFoods',
    color: '#E51C1C',
  },
  {
    img: 'nutsTableful.png',
    head: 'Nuts\n(In Moderation)',
    color: '#5FE775',
  },
];

const width = Dimensions.get('window').width;
const DietaryGuide = () => {
  const {openBottomSheet} = useBottomSheet();

  const [load, setLoad] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setLoad(false));

    return () => clearTimeout(id);
  }, []);
  if (load) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BackButtonHeader heading="Dietary Guide" />
      <ScrollView style={{flex: 1, padding: 16}}>
        <DGHeading head="Diabetic Diet Principle" />
        <ScrollView horizontal nestedScrollEnabled>
          {DPItems.map(e => (
            <DietPrincipalCard key={e.id} item={e} />
          ))}
        </ScrollView>
        <View style={{height: 20}} />

        <Text>
          Discover essential diabetic diet principles, including a Healthy
          Eating Plate tailored for diabetes management. Find out which foods to
          eat liberally, moderately and those to avoid. Plus, explore effective
          home remedies for managing diabetes mellitus naturally.
        </Text>
        <DGHeading head={'Healthy Eating Plate for Diabetic\nIndividual'} />
        {/* <AudioPlayer url={`${R2_AUDIO_URL}`} /> */}
        <View
          style={{
            padding: 60,
            aspectRatio: 1,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              aspectRatio: 1 / 1.2,
              width: 60,
              top: -50,
              left: -50,
            }}
            onPress={() =>
              openBottomSheet({
                head: 'Fluids',
                bullet: true,
                desc: [
                  ' Water or zero caloric drink.',
                  'Avoid sweetened beverages.',
                ],
              })
            }>
            <Image
              src={`${R2_URL}waterglass.png`}
              style={{width: '100%', height: '100%', objectFit: 'fill'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              aspectRatio: 1 / 1.2,
              width: 60,
              bottom: -50,
              left: -50,
            }}
            onPress={() =>
              openBottomSheet({
                head: 'Fruits',
                bullet: true,
                desc: ['Eat a small amount of fruit 1-2 cups per day.'],
              })
            }>
            <Image
              src={`${R2_URL}fruiteseclipls.png`}
              style={{width: '100%', height: '100%', objectFit: 'fill'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              aspectRatio: 1 / 1.2,
              width: 60,
              bottom: -50,
              left: (width * 60) / 100,
            }}
            onPress={() =>
              openBottomSheet({
                head: 'Healthy Oil',
                bullet: true,
                desc: [
                  'Healthy fats can be found in in foods like olive oil, nuts, some types of fish, etc.',
                  '3-4 teaspoon of fats/oils per day',
                  'Use combinations of oils',
                  '20-30% of total calories from fats',
                ],
                audio: `${R2_AUDIO_URL}calculatebuttonvoiceforbmi.mp3`,
              })
            }>
            <Image
              src={`${R2_URL}oileclipps.png`}
              style={{width: '100%', height: '100%', objectFit: 'fill'}}
            />
          </TouchableOpacity>
          <View style={{width: '50%', height: '100%'}}>
            <TouchableOpacity
              onPress={() =>
                openBottomSheet({
                  head: 'Non starchy vegetables ',
                  bullet: true,
                  desc: ['Vegetables', 'Green leafy vegetables'],
                })
              }>
              <Image
                src={`${R2_URL}nonstarchyfood.png`}
                style={{width: '100%', height: '100%', objectFit: 'fill'}}
              />
            </TouchableOpacity>
          </View>
          <View style={{width: '50%', height: '100%'}}>
            <TouchableOpacity
              style={{height: '50%', minHeight: '50%'}}
              onPress={() =>
                openBottomSheet({
                  head: 'Protein foods',
                  bullet: true,
                  desc: [
                    'Quarter plate with foods high in protein',
                    'Legumes and pulses',
                    'Skimmed or Low-fat Milk and Milk Products',
                    'Fish, Eggs and Poultry',
                    'Meat and Meat Products',
                    '12-15% of total calories from protein.',
                  ],
                })
              }>
              <Image
                src={`${R2_URL}proteinfoods.png`}
                style={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'fill',
                  marginLeft: 2,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{height: '50%', minHeight: '50%'}}
              onPress={() =>
                openBottomSheet({
                  head: 'Cereals and Millets',
                  bullet: true,
                  desc: ['55-60% of total calories from carbohydrates.'],
                })
              }>
              <Image
                src={`${R2_URL}carbohydratefoods.png`}
                style={{height: '100%', width: '100%', objectFit: 'fill'}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <DGHeading head="Food Included " />
        <FoodsIncluded />
        <Image
          src={`${R2_URL}dgYoga.png`}
          style={{width: '100%', aspectRatio: 1 / 1.6, objectFit: 'fill'}}
        />
        <DGHeading head="Crave and Cut" />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'stretch',
          }}>
          {CRAVE_AND_CUT.map((e, i) => (
            <View style={{width: '49%'}}>
              <SympromesOfDiaCard
                img={e.img}
                borderColor={e.color}
                label={e.head}
                key={e.img + e.color + e.head + i}
                width={'100%'}
              />
            </View>
          ))}
        </View>
        <DGHeading head="Home Remedies for Diabetes Mellitus" />
        {HOME_REMADIES.map(e => {
          return <ModyCard item={e} key={e.id} />;
        })}
        <View style={{height: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DietaryGuide;

const styles = StyleSheet.create({});
