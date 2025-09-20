import React, {FC} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RoundedNextSvg} from '../assets/Svg';
import expDia from '../assets/icons/expDia.png';
import expDiet from '../assets/icons/expDiet.png';
import expExc from '../assets/icons/expExc.png';
import expMody from '../assets/icons/expMody.png';
import {StackNavigation} from '../Stack';
import {DGHeading} from '../screens/DiabetesGuide';

type ResultGuideCardProps = {
  label: string;
  img: ImageSourcePropType;
  onPress: () => void;
};

const ResultGuideCard: FC<ResultGuideCardProps> = ({img, label, onPress}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}>
      <Image style={styles.cardImage} source={img} />
      <View style={styles.cardFooter}>
        <Text style={styles.cardLabel}>{label}</Text>
        <RoundedNextSvg height={20} width={20} />
      </View>
    </TouchableOpacity>
  );
};

const ResultGuide = () => {
  const {navigate} = useNavigation<StackNavigation>();

  return (
    <View style={styles.container}>
      <DGHeading head="Get the right guidance" />

      <View style={styles.row}>
        <ResultGuideCard
          img={expDia}
          label="Explore Diabetes"
          onPress={() => navigate('DiabetesGuideScreen')}
        />
        <ResultGuideCard
          img={expMody}
          label="Explore MODY"
          onPress={() => navigate('ModyScreen')}
        />
      </View>

      <View style={styles.row}>
        <ResultGuideCard
          img={expDiet}
          label="Explore Diet"
          onPress={() => navigate('DietaryGuideScreen')}
        />
        <ResultGuideCard
          img={expExc}
          label="Explore Exercise"
          onPress={() => navigate('ExcerciseGuideScreen')}
        />
      </View>
    </View>
  );
};

export default ResultGuide;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FFF',
    padding: 20,
    elevation: 4,
  },
  cardImage: {
    height: 38,
    aspectRatio: 1,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 6,
  },
});
