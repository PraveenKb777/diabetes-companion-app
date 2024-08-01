import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import moment from 'moment';
import {TimeCircleSVG} from '../assets/Svg';

interface IBMICard {
  name?: string;
  bmiScore?: number;
  height?: number;
  weight?: number;
  time?: string;
  gender?: 'male' | 'female';
  hip?: number;
  waist?: number;
  whrScore?: number;
  age?: number;
  drfScore?: number;
  modyScore?: number;
  carbohydrate_g: number;
  energy_kcal: number;
  fat_g: number;
  fiber_g: number;
  protein_g: number;
  onPress?: () => void;
}

const fetchCategory = (val: number) => {
  let cat;
  if (val < 18.5) {
    cat = 'Underweight';
  } else if (val >= 18.5 && val <= 24.9) {
    cat = 'Normal';
  } else if (val >= 25 && val <= 29.9) {
    cat = 'Pre-obesity';
  } else {
    cat = 'Obesity';
  }

  return cat;
};
const findDrfGrade = (val: number) => {
  let cat: string;

  if (val < 30) {
    cat = 'Low';
  } else if (val >= 30 && val < 50) {
    cat = 'Moderate';
  } else {
    cat = 'High';
  }

  return cat;
};
const findBodyGrade = (val: number, gender: string = 'male') => {
  let cat: string;

  if (gender === 'male') {
    if (val < 0.9) {
      cat = 'Low';
    } else if (val >= 0.9 && val < 0.95) {
      cat = 'Moderate';
    } else {
      cat = 'High Risk';
    }
  } else {
    if (val < 0.8) {
      cat = 'Low';
    } else if (val > 0.8 && val < 0.85) {
      cat = 'Moderate';
    } else {
      cat = 'High Risk';
    }
  }

  return cat;
};

const findModyLevel = (val: number) => {
  let cat: string;

  if (val < 30) {
    cat = 'Low';
  } else if (val >= 31 && val < 61) {
    cat = 'Moderate';
  } else {
    cat = 'High';
  }

  return cat;
};

const RenderText: FC<{label?: string; text?: any; unit?: string}> = ({
  label,
  text,
  unit,
}) => {
  if (!text) {
    return null;
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '60%',
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          fontSize: 16,
          color: '#000',
          fontStyle: 'italic',
          width: '40%',
        }}>
        {label}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#000',
        }}>
        :
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#000',
          width: '40%',
          textTransform: 'capitalize',
        }}>
        {text}{' '}
        {unit ? (
          <Text
            style={{
              fontSize: 10,
              color: '#9D9D9D',
              fontStyle: 'italic',
            }}>{`(${unit})`}</Text>
        ) : null}
      </Text>
    </View>
  );
};

const BMICard: FC<IBMICard> = ({
  bmiScore,
  height,
  name,
  time,
  weight,
  whrScore,
  gender,
  hip,
  waist,
  age,
  drfScore,
  modyScore,
  carbohydrate_g,

  energy_kcal,
  fat_g,
  fiber_g,
  protein_g,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress && onPress}
      style={styles.bmiCardMain}>
      <RenderText label="Name" text={name} />
      <RenderText
        label="BMI Score"
        text={bmiScore !== undefined ? bmiScore + '' : undefined}
      />
      <RenderText
        label="Category"
        text={bmiScore !== undefined ? fetchCategory(bmiScore) : undefined}
      />
      <RenderText label="Height" text={height} unit="cm" />
      <RenderText label="Weight" text={weight} unit="kg" />
      <RenderText label="Gender" text={gender} />
      <RenderText label="WHR Score" text={whrScore} />
      <RenderText
        label="Risk level"
        text={whrScore && gender ? findBodyGrade(whrScore, gender) : undefined}
      />
      <RenderText label="Age" text={age} />
      <RenderText label="Waist" text={waist} unit="inches" />
      <RenderText label="Hip" text={hip} unit="inches" />
      <RenderText
        label="DRF Score"
        text={drfScore !== undefined ? drfScore + '' : undefined}
      />
      <RenderText
        label="MODY Score"
        text={modyScore !== undefined ? modyScore + '' : undefined}
      />
      <RenderText
        label="Risk Level"
        text={drfScore !== undefined ? findDrfGrade(drfScore) : undefined}
      />
      <RenderText
        label="Risk Level"
        text={modyScore !== undefined ? findModyLevel(modyScore) : undefined}
      />
      <RenderText
        label="Total Energy"
        text={energy_kcal !== undefined ? energy_kcal + '' : undefined}
        unit="kacl"
      />
      <RenderText
        label="Carbohydrate"
        text={carbohydrate_g !== undefined ? carbohydrate_g + '' : undefined}
        unit="gm"
      />
      <RenderText
        label="Protein"
        text={protein_g !== undefined ? protein_g + '' : undefined}
        unit="(kacl)"
      />
      <RenderText
        label="Fat"
        text={fat_g !== undefined ? fat_g + '' : undefined}
        unit="gm"
      />
      <RenderText
        label="Fiber"
        text={fiber_g !== undefined ? fiber_g + '' : undefined}
        unit="gm"
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 11, 33, 0.03)',
          alignSelf: 'flex-end',
          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'rgba(0, 11, 33, 0.20)',
        }}>
        <TimeCircleSVG />
        <View style={{width: 10}} />
        <Text style={{color: '#000', fontWeight: '500'}}>
          {moment(time).format('h:mm a')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BMICard;

const styles = StyleSheet.create({
  bmiCardMain: {
    padding: 16,
    elevation: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0, 11, 33, 0.20)',
    borderRadius: 5,
    marginBottom: 10,
  },
});
