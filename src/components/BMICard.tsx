import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import moment from 'moment';
import {TimeCircleSVG} from '../assets/Svg';

// ---------- Utility Functions ----------
const fetchBMICategory = (val: number) => {
  if (val < 18.5) return 'Underweight';
  if (val >= 18.5 && val <= 24.9) return 'Normal';
  if (val >= 25 && val <= 29.9) return 'Pre-obesity';
  return 'Obesity';
};

const findDrfGrade = (val: number) => {
  if (val < 30) return 'Low';
  if (val >= 30 && val < 50) return 'Moderate';
  return 'High';
};

const findBodyGrade = (val: number, gender: string = 'male') => {
  if (gender === 'male') {
    if (val < 0.9) return 'Low';
    if (val >= 0.9 && val < 0.95) return 'Moderate';
    return 'High Risk';
  } else {
    if (val < 0.8) return 'Low';
    if (val > 0.8 && val < 0.85) return 'Moderate';
    return 'High Risk';
  }
};

const findModyLevel = (val: number) => {
  if (val < 30) return 'Low';
  if (val >= 31 && val < 61) return 'Moderate';
  return 'High';
};

// ---------- Small Reusable Text Renderer ----------
const RenderText: FC<{label: string; text?: any; unit?: string}> = ({
  label,
  text,
  unit,
}) => {
  if (text === undefined || text === null || text === '') return null;

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.separator}>:</Text>
      <Text style={styles.value}>
        {text}{' '}
        {unit ? <Text style={styles.unit}>{`(${unit})`}</Text> : null}
      </Text>
    </View>
  );
};

// ---------- Generic Card ----------
interface IResultCard {
  data: any; // Accepts any of IBmiResult | IWHRResults | IYADRResults | IModyResults | ICMPResults
  onPress?: () => void;
}

const ResultCard: FC<IResultCard> = ({data, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.card}>
      {/* Common fields */}
      <RenderText label="Name" text={data.name} />
      <RenderText label="Age" text={data.age} />
      <RenderText label="Gender" text={data.gender} />

      {/* BMI */}
      <RenderText label="BMI Score" text={data.bmi_score ?? data.bmi} />
      {data.bmi_score || data.bmi ? (
        <RenderText
          label="Category"
          text={fetchBMICategory(data.bmi_score ?? data.bmi)}
        />
      ) : null}
      <RenderText label="Height" text={data.height_cm} unit="cm" />
      <RenderText label="Weight" text={data.weight_kg} unit="kg" />

      {/* WHR */}
      <RenderText label="WHR Score" text={data.whr_score ?? data.whr} />
      {(data.whr_score || data.whr) && data.gender ? (
        <RenderText
          label="Risk level"
          text={findBodyGrade(data.whr_score ?? data.whr, data.gender)}
        />
      ) : null}
      <RenderText label="Waist" text={data.waist_cm} unit="cm" />
      <RenderText label="Hip" text={data.hip_cm} unit="cm" />

      {/* DRF */}
      <RenderText label="DRF Score" text={data.drf_score} />
      {data.drf_score !== undefined && (
        <RenderText label="Risk Level" text={findDrfGrade(data.drf_score)} />
      )}

      {/* MODY */}
      <RenderText label="MODY Score" text={data.mody_score} />
      {data.mody_score !== undefined && (
        <RenderText label="Risk Level" text={findModyLevel(data.mody_score)} />
      )}
      <RenderText label="HbA1c" text={data.hba1c} unit="%" />

      {/* YADR Specific */}
      <RenderText label="YADR Score" text={data.yadr_score} />
      <RenderText label="Random Glucose" text={data.random_blood_glucose} unit="mg/dL" />
      <RenderText label="BP Sys" text={data.bp_sys} unit="mmHg" />
      <RenderText label="BP Dia" text={data.bp_dia} unit="mmHg" />

      {/* CMP */}
      <RenderText label="Total Energy" text={data.energy_kcal} unit="Kcal" />
      <RenderText label="Carbohydrate" text={data.carbohydrate_g} unit="g" />
      <RenderText label="Protein" text={data.protein_g} unit="g" />
      <RenderText label="Fat" text={data.fat_g} unit="g" />
      <RenderText label="Fiber" text={data.fiber_g} unit="g" />

      {/* Created at */}
      {data.created_at && (
        <View style={styles.timeRow}>
          <TimeCircleSVG />
          <View style={{width: 10}} />
          <Text style={styles.timeText}>
            {moment(data.created_at).format('h:mm a')}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default ResultCard;

// ---------- Styles ----------
const styles = StyleSheet.create({
  card: {
    padding: 16,
    elevation: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(0, 11, 33, 0.20)',
    borderRadius: 5,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: '#000',
    fontStyle: 'italic',
    width: '40%',
  },
  separator: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    width: '40%',
    textTransform: 'capitalize',
  },
  unit: {
    fontSize: 10,
    color: '#9D9D9D',
    fontStyle: 'italic',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 11, 33, 0.03)',
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 11, 33, 0.20)',
  },
  timeText: {
    color: '#000',
    fontWeight: '500',
  },
});
