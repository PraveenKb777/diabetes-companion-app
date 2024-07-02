import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import BackButtonHeader from '../components/BackButtonHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {DGHeading} from './DiabetesGuide';
import EGCard from '../components/EGCard';
import excerciseflow from '../assets/img/exerciseflow.png';
import {
  BottomSheetNobullet,
  BottomSheetYesbullet,
  useBottomSheet,
} from '../context/BottomSheetContext';
import ExcersiseImgCard from '../components/ExcersiseImgCard';
import popUpContent from '../popUpContent';
import YoutubeIframe from 'react-native-youtube-iframe';
import {R2_URL} from '@env';

const streachingList: {head: string; img: string; key: string}[] = [
  {
    head: 'Forward Neck Stretch',
    key: 'Forward Neck Stretch',
    img: 'ForwardBendStretch.png',
  },
  {
    head: 'Neck Rotation Stretch',
    key: 'Neck Rotation Stretch',
    img: 'nechrotationstrech.png',
  },
  {
    head: 'Upper Trapezius Stretch',
    key: 'Upper Trapezius Stretch',
    img: 'upperTrapeziusStretch.png',
  },
  {
    head: 'Trapezius Stretch',
    key: 'Trapezius Stretch',
    img: 'TrapeziusStretch.png',
  },
  {
    head: 'Wing Span Stretch',
    key: 'Wing Span Stretch',
    img: 'WingSpanStretch.png',
  },
  {
    head: 'Wrist Stretch',
    key: 'Wrist Stretch',
    img: 'WristStretch.png',
  },
  {
    head: 'Shoulder Rotation Stretch',
    key: 'Shoulder Rotation Stretch',
    img: 'ShoulderRotationStretch.png',
  },
  {
    head: 'Forward Bend Stretch',
    key: 'Forward Bend Stretch',
    img: 'ForwardNeckStretch.png',
  },
  {
    head: 'Single Leg Forward Bend',
    key: 'Single Leg Forward Bend',
    img: 'SingleLegForwardBend.png',
  },
  {
    head: 'Rotating Toe Touches',
    key: 'Rotating Toe Touches',
    img: 'RotatingToeTouches.png',
  },
  {
    head: 'Standing Knee to Chest ',
    key: 'Standing Knee to Chest',
    img: 'StandingKneetoChest%20.png',
  },
  {
    head: 'Ankle Rotate Stretch',
    key: 'Ankle Rotate Stretch',
    img: 'AnkleRotateStretch.png',
  },
];
interface IEGList {
  img: string;
  head: string;
  desc?: string;
}
const EGList: IEGList[] = [
  {
    head: 'Insulin users should consult their doctor before intense exercise',
    img: 'egdocconsult.png',
  },
  {
    head: 'Check blood glucose before exercise; if under  70 mg/dL, take 15g carbs (candy, juice, honey, sugar), wait 15 mins, retest to prevent hypoglycemia',
    img: 'egbloodtest.png',
  },
  {
    head: 'Encourage morning exercise; discourage evening workouts to prevent late-night hypoglycemia',
    img: 'egdumbellexe.png',
  },
  {
    head: 'Schedule exercise 1-3 hours post-meal',
    img: 'egfoodhealth.png',
  },
  {
    head: 'Do not skip meals before exercise',
    img: 'egtimeeat.png',
  },
  {
    head: 'Wear moisture-wicking socks and shoes',
    img: 'eglegs.png',
  },
  {
    head: 'Temperature regulation issues suggest avoiding extreme climates',
    img: 'egtemp.png',
  },
  {
    head: 'Do not exercise for a long period of time',
    img: 'egweights.png',
  },
  {
    head: 'Stay hydrated and avoid rapid head movements during exercise',
    img: 'egdrinkwater.png',
  },
];

// ArdhaMatsyendrasana.png

// Dhanurasana.png

// Kapalbhati.png

// NadiShodhanPranaya.png

// Paschimottanasana.png

// Pawanmuktasana.png

// Shavasna.png

// Tadasana.png

// Vajarasana.png

const featuredPosesList: IEGList[] = [
  {
    head: 'Bhujangasana',
    desc: '(Cobra Pose)',
    img: 'Bhujangasana.png',
  },
  {
    head: 'Sukhasana',
    desc: '(Easy Pose)',
    img: 'Sukhasana.png',
  },
  {
    head: 'Padmasana',
    desc: '(Lotus Pose)',
    img: 'Padmasana.png',
  },
  {
    head: 'Vajarasana',
    desc: '(Thunder Bolt Pose)',
    img: 'Vajarasana.png',
  },
  {
    head: 'Pawanmuktasana',
    desc: '(Wind Releasing)',
    img: 'Pawanmuktasana.png',
  },
  {
    head: 'Tadasana',
    desc: '(Mountain Pose)',
    img: 'Tadasana.png',
  },
  {
    head: 'Paschimottanasana',
    desc: '(Seated Forward Bend)',
    img: 'Paschimottanasana.png',
  },
  {
    head: 'Dhanurasana',
    desc: '(Mountain Pose)',
    img: 'Dhanurasana.png',
  },
  {
    head: 'Ardha Matsyendrasana',
    desc: '(Lord) ',
    img: 'ArdhaMatsyendrasana.png',
  },
  {
    head: 'Shavasna',
    desc: '(Corspse Pose) ',
    img: 'Shavasna.png',
  },
  {
    head: 'Kapalbhati',
    desc: '(Skull Shining)',
    img: 'Kapalbhati.png',
  },
  {
    head: 'Nadi ShodhanPranaya',
    desc: '(Alternate NostrilBreathing)',
    img: 'NadiShodhanPranaya.png',
  },
];

// AdhoMukhaSvanasana.png

// AshtangaNamaskar.png

// AshwaSanchalasana.png

// Bhujangasana.png

// HastaUttasana.png

// Padahastasana.png

// Pranamasana.png

const suryaNamaskarList: IEGList[] = [
  {
    head: 'Step 1. Pranamasana',
    img: 'Pranamasana.png',
    desc: '(Namste Prayer) ',
  },
  {
    head: 'Step 2. Hasta Uttasana',
    img: 'HastaUttasana.png',
    desc: '(Upward Salute)',
  },
  {
    head: 'Step 3. Padahastasana',
    img: 'Padahastasana.png',
    desc: '(Forward Fold)',
  },
  {
    head: 'Step 4. Ashwa Sanchalasana',
    img: 'AshwaSanchalasana.png',
    desc: '(Left Leg Lunge)',
  },
  {
    head: 'Step 5.  Adho Mukha Svanasana',
    img: 'AdhoMukhaSvanasana.png',
    desc: '(Downward Dog)',
  },
  {
    head: 'Step 6. Ashtanga Namaskar',
    img: 'AshtangaNamaskar.png',
    desc: '(Eight Limbed Pose)',
  },
  {
    head: 'Step 7.Bhujangasana',
    img: 'Bhujangasana.png',
    desc: '(Cobra Pose) ',
  },
  {
    head: 'Step 8. Adho Mukha  Svanasana',
    img: 'AdhoMukhaSvanasana.png',
    desc: '(Downward Dog)',
  },
  {
    head: 'Step 9. Ashwa Sanchalasana',
    img: 'AshwaSanchalasana.png',
    desc: '(Left Leg Lunge)',
  },
  {
    head: 'Step 10. Padahastasana',
    img: 'Padahastasana.png',
    desc: '(Forward Fold)',
  },
  {
    head: 'Step 11. Hasta Uttasana',
    img: 'HastaUttasana.png',
    desc: '(Upward Salute)',
  },
  {
    head: 'Step 12. Pranamasana',
    img: 'Pranamasana.png',
    desc: '(Namste Prayer) ',
  },
];

const NoteComponent = () => (
  <View
    style={{
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.20)',
      borderRadius: 10,
      backgroundColor: '#fff',
      elevation: 2,
    }}>
    <Text style={{fontSize: 16, fontStyle: 'italic'}}>
      <Text style={{color: '#000'}}>Note : </Text>Click on the image to know
      more.
    </Text>
  </View>
);

const ExcerciseGudie = () => {
  const {openBottomSheet} = useBottomSheet();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BackButtonHeader heading="Exercise Guide" />
      <ScrollView style={{flex: 1, padding: 16}}>
        <DGHeading
          head={'Move and Conquer: Your Guide to\nExercise with Diabetes'}
        />
        <Text>
          Exercise on a regular basis improves stamina and strength, raises
          “Good” cholesterol, aids in glycemic control, and keep the body fit
          and healthy. Let’s dive into the key aspects of an effective exercise
          routine for individuals with diabetes.
        </Text>
        <DGHeading head="Exercise guidelines" />
        <FlatList
          data={EGList}
          horizontal
          nestedScrollEnabled
          renderItem={e => (
            <EGCard
              img={e.item.img}
              label={e.item.head}
              key={e.index + e.item.head}
            />
          )}
        />
        <DGHeading head="Types of exercise" />
        <View
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.20)',
            borderRadius: 10,
          }}>
          <Image
            source={excerciseflow}
            style={[{width: '100%', height: 300, objectFit: 'fill'}]}
          />
        </View>

        <DGHeading head="Flexibility Exercise" />
        <Text style={{color: '#000'}}>
          Flexibility exercises are aimed at improving the muscle tone and
          motion at joints.{' '}
        </Text>
        <BottomSheetNobullet
          item={{
            bullet: false,
            desc: 'It loosens the muscle and reduces muscle cramps.',
            head: 'Benefits',
          }}
        />
        <BottomSheetNobullet
          item={{
            bullet: false,
            desc: 'Stretching, Yoga',
            head: 'Examples',
          }}
        />
        <DGHeading head="Stretching" />
        <Text>
          {
            'Stretching the muscles and joints helps with the smooth motion of the body.\naaIt also improves the physical activity of the body and increases blood flow.'
          }
        </Text>
        <Text style={{fontWeight: '700', color: '#000', fontSize: 16}}>
          A single stretch can be held for 15 to 20 seconds, and then repeated
          two to four times.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          {streachingList.map((e, i) => (
            <ExcersiseImgCard
              img={e.img}
              label={e.head}
              key={e.head + e.img + i}
              onClick={() => {
                openBottomSheet(popUpContent[e.key]);
              }}
            />
          ))}
        </View>
        <NoteComponent />
        <View style={{height: 20}} />
        <YoutubeIframe height={250} videoId="GYGIVAb5s4U" />
        <DGHeading head="Yoga" />
        <Text style={{color: '#000'}}>
          Ancient wisdom meets modern medicine: Yoga, simple and accessible,
          complements diabetes management by:
        </Text>
        <View style={{height: 10}} />

        <BottomSheetNobullet
          item={{
            bullet: false,
            head: 'Boosting insulin',
            desc: 'Specific poses stimulate pancreas and improve insulin sensitivity.',
          }}
        />
        <BottomSheetNobullet
          item={{
            bullet: false,
            head: 'Balancing blood sugar',
            desc: 'Practice helps control glucose levels and enhances metabolism.',
          }}
        />
        <BottomSheetNobullet
          item={{
            bullet: false,
            head: 'Enhancing wellbeing',
            desc: 'Yoga reduces stress, improves quality of life, and manages complications.',
          }}
        />
        <BottomSheetNobullet
          item={{
            bullet: false,
            head: 'Main strays of Yoga',
            desc: 'Simple physical exercises (asanas), breathing exercises (pranayama), and relaxation techniques (savasana) or meditation.',
          }}
        />
        <DGHeading head="Featured poses" />
        <BottomSheetNobullet
          item={{
            bullet: false,
            head: 'Abdominal & forward bends',
            desc: ' Stimulate pancreas for insulin release.',
          }}
        />
        <BottomSheetNobullet
          item={{
            bullet: false,
            head: 'Dhanurasana, matsyendrasana, vajrasana, bhujangasana, setubhandhasana, and pavanamuktasan',
            desc: 'Increase insulin utilization for glucose absorption. ',
          }}
        />
        <BottomSheetNobullet
          item={{
            bullet: false,
            head: 'Sitting postures (ardhamatsyendrasan, yoga mudra, and mandukasan) & body twists (vakrasan and ardhamatsyendrasan)',
            desc: 'Optimize pancreatic function & digestion.',
          }}
        />
        <BottomSheetNobullet
          item={{
            bullet: false,
            head: 'Surya namaskar or Sun salutation',
            desc: 'Practicing 30 minutes of suya namaskar helps powerful flow for metabolic balance & pre-diabetic support.',
          }}
        />
        <DGHeading head="Featured poses" />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          {featuredPosesList.map((e, i) => (
            <ExcersiseImgCard
              img={e.img}
              label={e.head}
              desc={e.desc}
              key={e.head + e.img + e.desc + i}
              onClick={() => openBottomSheet(popUpContent[e.head])}
            />
          ))}
        </View>
        <NoteComponent />
        <DGHeading head="Surya Namaskar (Sun Salutation)" />
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          {suryaNamaskarList.map((e, i) => (
            <ExcersiseImgCard
              img={e.img}
              label={e.head}
              desc={e.desc}
              key={e.head + e.img + e.desc + i}
              onClick={() => openBottomSheet(popUpContent[e.head])}
            />
          ))}
        </View>
        <View style={{height: 20}} />
        <YoutubeIframe height={250} videoId="GYGIVAb5s4U" />
        <DGHeading head="Aerobic Exercise" />
        <Text style={{color: '#000'}}>
          Large muscular groups are used during aerobic activity, which uses
          oxygen for an extended length of time. It comprises of large muscles
          moving continuously, repeatedly, and rhythmically. During aerobic
          exercise heart rate and breathe rate increases. Rhythmic aerobic
          exercise is very important. A total of 30-45 minutes should be spent
          exercising every day
        </Text>
        <BottomSheetYesbullet
          item={{
            bullet: true,
            head: 'Benefits',
            desc: [
              'Improves blood flow.',
              'Reduces blood pressure, blood glucose and blood cholesterol.',
              'Cardiorespiratory fitness is enhanced.',
            ],
          }}
        />
        <View style={{height: 20}} />

        <Image
          src={R2_URL + 'aerobicImg.png'}
          style={[{width: '100%', height: 300, objectFit: 'fill'}]}
        />

        <DGHeading head="Strength Exercise" />
        <Text style={{color: '#000'}}>
          Exercises that build muscle strength involve lifting objects or
          pushing back against resistance. High intensity workouts help in
          strengthening the muscles.
        </Text>
        <BottomSheetYesbullet
          item={{
            bullet: true,
            head: 'Benefits',
            desc: [
              'Build up stamina, lean muscle mass.',
              'Improves insulin secretion and helps maintain glucose level.',
              'Reduces the risk of cardiovascular diseases.',
            ],
          }}
        />
        <View style={{height: 20}} />

        <Image
          src={R2_URL + 'strength.png'}
          style={[{width: '100%', height: 300, objectFit: 'fill'}]}
        />
        <View style={{height: 30}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExcerciseGudie;

const styles = StyleSheet.create({});
