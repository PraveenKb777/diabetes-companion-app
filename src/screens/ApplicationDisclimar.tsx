import {
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BackButtonHeader from '../components/BackButtonHeader';
import {ScrollView} from 'react-native-gesture-handler';
import {DGHeading} from './DiabetesGuide';
import {PdfSvg} from '../assets/Svg';
import {R2_URL} from '@env';

const ApplicationDisclimar = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BackButtonHeader heading="Application Importance and Disclaimer" />
      <ScrollView style={{flex: 1}} contentContainerStyle={{padding: 16}}>
        <DGHeading head="Aim" />
        <Text style={styles.content}>
          To create awareness on diabetes particularly Maturity onset Diabetes
          of the Young(MODY) among diabetes patients & common people.
        </Text>
        <DGHeading head="App Importance" />
        <View style={styles.appImportCont}>
          <Text style={styles.appImpText}>
            Helps to reduce the complications of diabetes and also control
            diabetes
          </Text>
          <View style={styles.seperator} />
          <Text style={styles.appImpText}>Pave way for correct treatment</Text>
          <View style={styles.seperator} />
          <Text style={styles.appImpText}>
            Helps to change lifestyle practices
          </Text>
          <View style={styles.seperator} />
          <Text style={styles.appImpText}>
            Assist in distinguishing between facts and myths of diabetes
          </Text>
          <View style={styles.seperator} />
          <Text style={styles.appImpText}>
            Increases the understanding on diabetes
          </Text>
          <View style={styles.seperator} />
        </View>
        <DGHeading head="Disclaimer" />
        <Text style={styles.content}>
          This app is designed only for awareness purpose. Consult
          physician/dietician before trying out anything in this app.
        </Text>
        <View style={[styles.seperator, {width: '100%', marginVertical: 16}]} />
        <DGHeading head="Reference" />
        <TouchableOpacity
          style={[
            styles.appImportCont,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          ]}
          onPress={() => Linking.openURL(`${R2_URL}app_reference.pdf`)}>
          <Text style={[styles.content, {maxWidth: '70%'}]}>
            Click to download the pdf to know more about references.
          </Text>
          <PdfSvg />
        </TouchableOpacity>
        <View style={[styles.seperator, {width: '100%', marginVertical: 16}]} />
        <View style={styles.appImportCont}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#000',
              textAlign: 'center',
            }}>
            Your data will remain confidential and will be used solely to
            provide you with a personalized app experience.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplicationDisclimar;

const styles = StyleSheet.create({
  content: {
    fontStyle: 'italic',
  },
  appImportCont: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
    borderColor: 'rgba(0, 0, 0, 0.20)',
    elevation: 5,
  },
  appImpText: {
    color: '#000',
    fontWeight: '500',
  },
  seperator: {
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
    height: 1,
    width: '50%',
    marginVertical: 10,
  },
});
