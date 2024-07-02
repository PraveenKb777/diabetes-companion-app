/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import cmp from '../assets/img/cmp_menu.png';
import questiontablets from '../assets/img/questiontablets.png';
import riskfinder from '../assets/img/riskfinder_menu.png';
import Carousel, {CarouselItem} from '../components/Carousal';
import DownGradientBox from '../components/DownGradientBox';
import ModyCard from '../components/ModyCard';

import dna from '../assets/mody/dna.png';

import map from '../assets/diabetesMellitus/map.png';
import noappatite from '../assets/diabetesMellitus/noappatite.png';
import rbc from '../assets/diabetesMellitus/rbc.png';
import sugartester from '../assets/diabetesMellitus/sugartester.png';
import insulin from '../assets/mody/insulin.png';
import DiabetesMellitusCard from '../components/DiabetesMellitusCard';
import DietPrincipalCard from '../components/DietPrincipalCard';

import cereals from '../assets/diabeticPlanner/cereals.png';
import fruits from '../assets/diabeticPlanner/fruits.png';
import periodicname from '../assets/diabeticPlanner/periodicname.png';
import spinach from '../assets/diabeticPlanner/spinach.png';
import vegetables from '../assets/diabeticPlanner/vegetables.png';

import excerciseflow from '../assets/img/exerciseflow.png';
import CustomButton from '../components/CustomButton';
import HomeHeader from '../components/HomeHeader';
import MythsAndFactsCard, {
  IMythAndFactItem,
} from '../components/MythsAndFactsCard';

// myth and fact
import blindperson from '../assets/mythandfact/blindperson.png';
import candonateblood from '../assets/mythandfact/candonateblood.png';
import chocklate from '../assets/mythandfact/chocklate.png';
import deadlift from '../assets/mythandfact/deadlift.png';
import dhumbelllift from '../assets/mythandfact/dhumbelllift.png';
import diabetesinjection from '../assets/mythandfact/diabetesinjection.png';
import diavetessugarblock from '../assets/mythandfact/diavetessugarblock.png';
import doctoradvice from '../assets/mythandfact/doctoradvice.png';
import insulininjecting from '../assets/mythandfact/insulininjecting.png';
import machineonnotes from '../assets/mythandfact/machineonnotes.png';
import machinesugardrop from '../assets/mythandfact/machinesugardrop.png';
import noblooddonation from '../assets/mythandfact/noblooddonation.png';
import norice from '../assets/mythandfact/norice.png';
import overexcersise from '../assets/mythandfact/overexcersise.png';
import pancreas from '../assets/mythandfact/pancreas.png';
import splitedbreads from '../assets/mythandfact/splitedbreads.png';
import streaching from '../assets/mythandfact/streaching.png';
import sugarfree from '../assets/mythandfact/sugarfree.png';
import sugarfreechocklate from '../assets/mythandfact/sugarfreechocklate.png';
import symptoms from '../assets/mythandfact/symptoms.png';
import vegetablenames from '../assets/mythandfact/vegetablenames.png';
import weightscale from '../assets/mythandfact/weightscale.png';
import whatyouprefer from '../assets/mythandfact/whatyouprefer.png';
import yesrice from '../assets/mythandfact/yesrice.png';

const MythFactList: IMythAndFactItem[] = [
  {
    id: 'wite]wgsvwgvgw',
    number: '#1',
    myth: 'Diabetes is not a big deal.',
    fact: 'If left unchecked, diabetes can cause serious compilations and premature death.',
    mythImg: diavetessugarblock,
    factImg: doctoradvice,
  },
  {
    id: 'wite]wgsvwgoogw',
    number: '#2',
    myth: 'Diabetes is caused due to eating so many sweets.',
    fact: 'Diabetes is caused due to inactivity or production insufficient by beta cells of Langerhans of pancreas.',
    mythImg: chocklate,
    factImg: pancreas,
  },
  {
    id: 'wite]wgs4twewvgw',
    number: '#3',
    myth: 'Overweight or obese will lead to diabetes.',
    fact: 'Diabetes is manageable and preventable; in pre-diabetes, reversal is possible. However, an unhealthy lifestyle post-recovery may lead to diabetes recurrence.',
    mythImg: weightscale,
    factImg: whatyouprefer,
  },
  {
    id: 'wite]wgsvw4%%^gw',
    number: '#4',
    myth: 'Diabetes can be cured.',
    fact: 'Diabetes is manageable and preventable; in pre-diabetes, reversal is possible. However, an unhealthy lifestyle post-recovery may lead to diabetes recurrence.',
    mythImg: insulininjecting,
    factImg: machineonnotes,
  },
  {
    id: 'wite]wgsvwg@#$325',
    number: '#5',
    myth: 'Each and every diabetic patient will lose their eyesight, legs and also affect from their organ failure.',
    fact: 'Complications of diabetes occur only when diabetes is not in control.',
    mythImg: blindperson,
    factImg: diabetesinjection,
  },
  {
    id: 'wite]wgsv%grwnm.avgw',
    number: '#6',
    myth: 'Diabetes patients should avoid Carbohydrates.',
    fact: 'Carbs can be taken in right amount. Low Glycemic Index carbohydrates can be included with plenty of ehole grains, Legumes low starch vegetables such as spinach, broccoli and tomato.',
    mythImg: splitedbreads,
    factImg: vegetablenames,
  },
  {
    id: 'wite]422452vtgwgvgw',
    number: '#7',
    myth: 'Diabetic patients should not eat rice but can eat wheat.',
    fact: "Wheat and rice, with comparable carbs and glycemic index, similarly affect blood glucose; the choice doesn't matter.",
    mythImg: norice,
    factImg: yesrice,
  },
  {
    id: 'wite]wgsvw24324gw',
    number: '#8',
    myth: '“Diabetes-friendly” and “sugar-free” food is good for diabetes.',
    fact: 'Avoid "diabetes-friendly" and "sugar-free" products, as they often contain high calories, carbs, and fats..',
    mythImg: sugarfree,
    factImg: sugarfreechocklate,
  },
  {
    id: 'otwpte]wgsvwgvgw',
    number: '#9',
    myth: 'Exercising heavy always leads to weight loss and blood glucose.',
    fact: "Exercise improves insulin sensitivity, lowers blood pressure, and promotes muscle gain, highlighting that health isn't solely tied to weight loss.",
    mythImg: deadlift,
    factImg: dhumbelllift,
  },
  {
    id: 'wite]wgsvwgv5666',
    number: '#10',
    myth: 'Diabetic patients should not exercise too heavy because it may decrease sugar level.',
    fact: 'Balancing exercise, insulin and diet will control the sugar level.',
    mythImg: overexcersise,
    factImg: streaching,
  },
  {
    id: 'wite]wgsvwg44sdgew',
    number: '#11',
    myth: 'People with diabetes should not donate blood.',
    fact: 'Once diabetes is under control, they can donate blood.',
    mythImg: noblooddonation,
    factImg: candonateblood,
  },
  {
    id: 'witefvwg44sdgew000',
    number: '#12',
    myth: 'Diabetic patients usually say they know when the blood glucose level will be high or low.',
    fact: "Symptoms don't reliably predict blood glucose; direct lab blood testing is essential for accuracy.",
    mythImg: machinesugardrop,
    factImg: symptoms,
  },
];

const HomeHead: FC<{head: string; onClick?: () => {}}> = ({
  head,
  onClick = () => {},
}) => {
  return (
    <View style={styles.headMainCont}>
      <Text style={[styles.headMainheadText]}>{head}</Text>
      <TouchableOpacity onPress={onClick}>
        <Text style={[styles.headMainKmText]}>Know More</Text>
      </TouchableOpacity>
    </View>
  );
};

export const DMItems: CarouselItem[] = [
  {
    id: '264njkwkk ken',
    img: map,
    head: 'Statistical Snapshot',
    desc: '1 in 10 adults (20-79 years) deals with diabetes, as per IDF Diabetes atlas (2021).',
  },
  {
    id: '264njkwqegtweken',
    img: noappatite,
    head: 'Hidden Battle',
    desc: 'Alarmingly, nearly half are unaware of their metabolic disorder.',
  },
  {
    id: '264eqqetgqeg',
    img: rbc,
    head: 'Metabolic Hurdles',
    desc: 'Insufficient insulin hinders glucose metabolism.',
  },
  {
    id: '264njkwkaegqegt99n',
    img: sugartester,
    head: 'Blood glucose surge',
    desc: 'Increase in blood glucose level, Signaling metabolic disruption',
  },
];

const DPItems: {id: string; img: any; head: string}[] = [
  {
    id: '0931ngagweggweg42',
    img: vegetables,
    head: 'LOW\nCARBOHYDRATES',
  },
  {
    id: '0931ngageqfg42',
    img: spinach,
    head: 'LOW \nFAT',
  },
  {
    id: '0931ngweggweg42',
    img: cereals,
    head: 'HIGH \n FIBER',
  },
  {
    id: '093gweggweg42',
    img: fruits,
    head: 'LOW \nGLYCEMIC INDEX',
  },
  {
    id: '0931ngggweg42',
    img: periodicname,
    head: 'ADEQUATE\nVITAMINS\nAND MINERALS ',
  },
];

const Home = () => {
  return (
    <SafeAreaView style={[styles.safeArea]}>
      <ScrollView style={[styles.scrolView]}>
        <HomeHeader />

        <View style={[{marginVertical: 20, marginHorizontal: -16}]}>
          <Carousel />
        </View>
        <View style={[styles.homeScreenNavs]}>
          <DownGradientBox img={cmp} label="Caloric Menu Planner - CMP" />
          <DownGradientBox img={riskfinder} label="BMI, WHR, Risk Finder" />
        </View>
        <HomeHead head="Unveiling MODY" />
        <ModyCard
          item={{
            id: '262brjwjrbttr',
            head: 'Distinct Diabetes Variant',
            desc: 'MODY is a unique diabetes type with 1% - 2% of all diabetes cases.',
            img: dna,
          }}
        />
        <ModyCard
          item={{
            id: '262brjwjrqfqegfqtr',
            head: 'Insulin',
            desc: 'Unlike common diabetes types, MODY may not require initial insulin.',
            img: insulin,
          }}
        />
        <HomeHead head="Diabetes Mellitus" />
        <ScrollView horizontal nestedScrollEnabled>
          {DMItems.map(e => (
            <DiabetesMellitusCard key={e.id} item={e} />
          ))}
        </ScrollView>

        <HomeHead head="Myths and Facts" />
        <MythsAndFactsCard
          item={{
            id: 'wite]wgsvwgvgw',
            number: '#1',
            myth: 'Diabetes is not a big deal.',
            fact: 'If left unchecked, diabetes can cause serious compilations and premature death.',
            mythImg: diavetessugarblock,
            factImg: doctoradvice,
          }}
        />
        <HomeHead head="Diabetic Diet Principle" />
        <ScrollView horizontal nestedScrollEnabled>
          {DPItems.map(e => (
            <DietPrincipalCard key={e.id} item={e} />
          ))}
        </ScrollView>
        <View style={{height: 10}} />

        <Text style={[{fontSize: 16}]}>
          Discover essential diabetic diet principles, including a Healthy
          Eating Plate tailored for diabetes management. Find out which foods to
          eat liberally, moderately and those to avoid. Plus, explore effective
          home remedies for managing diabetes mellitus naturally.
        </Text>
        <HomeHead head="Move and Conquer" />
        <View style={styles.lastCont}>
          <Image
            source={excerciseflow}
            style={[{width: '100%', height: 300}]}
          />
          <Text style={styles.headMainKmText}>
            Exercise on a regular basis improves stamina and strength, raises
            "good" cholesterol, aids in glycemic control, and keeps the body fit
            and healthy. Let's dive into the key aspects of an effective
            exercise routine for individuals with diabetes.
          </Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.20)',
            height: 1,
            width: '80%',
            marginVertical: 32,
            alignSelf: 'center',
          }}
        />
        <View style={styles.lastCont}>
          <Image
            source={questiontablets}
            style={[{width: '100%', height: 145, borderRadius: 8}]}
          />
          <View style={{height: 15}} />

          <Text style={[styles.headMainheadText]}>
            How much do you know about Diabetes?
          </Text>
          <View style={{height: 15}} />

          <Text style={[{fontSize: 16}]}>
            Test your knowledge and improve your diabetes management skills!
            Take our quick quiz to see how well you understand diabetes and
            learn new tips for staying healthy.
          </Text>
          <View style={{height: 15}} />

          <CustomButton
            label="Take a quiz"
            style={{alignSelf: 'flex-start', paddingHorizontal: 25}}
          />
        </View>

        <View style={{height: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrolView: {
    padding: 16,
  },
  homeScreenNavs: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  headMainCont: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headMainheadText: {
    fontSize: 16,
    fontWeight: 700,
    color: '#000',
  },
  headMainKmText: {
    fontStyle: 'italic',
    fontSize: 12,
    color: '#9D9D9D',
  },
  lastCont: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.20)',
    padding: 16,
    borderRadius: 10,
  },
});
