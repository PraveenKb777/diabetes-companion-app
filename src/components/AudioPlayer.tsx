/* eslint-disable react-hooks/exhaustive-deps */
// AudioPlayer.tsx
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Sound from 'react-native-sound';
import {AudioSVG} from '../assets/Svg';
import Equalizer from './Equilizer';
import {useFocusEffect} from '@react-navigation/native';

interface AudioPlayerProps {
  url: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({url}) => {
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [load, setLoad] = useState(true);
  //console.log(load);
  useEffect(() => {
    Sound.setCategory('SoloAmbient');
    const loadSound = () => {
      const soundFile = new Sound(url, undefined, error => {
        setLoad(false);
        if (error) {
          //console.log('Failed to load the sound', error);
          return;
        }
        setSound(soundFile);
      });
      //console.log(soundFile);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, [url]);
  useFocusEffect(
    useCallback(() => {
      return () => {
        stopSound();
      };
    }, [sound]),
  );

  const playSound = () => {
    if (sound) {
      sound.play(success => {
        if (success) {
          //console.log('Successfully finished playing');
        } else {
          //console.log('Playback failed due to audio decoding errors');
        }
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const stopSound = () => {
    if (sound) {
      sound.stop(() => {
        //console.log('Sound stopped');
        setIsPlaying(false);
      });
    }
  };

  return (
    <View style={{width: 100, alignSelf: 'flex-end'}}>
      <TouchableOpacity
        style={[styles.mainStyle]}
        onPress={isPlaying ? stopSound : playSound}>
        {load ? (
          <ActivityIndicator color={'white'} size={'small'} />
        ) : isPlaying ? (
          <Equalizer />
        ) : (
          <AudioSVG />
        )}
        <Text style={[styles.lable]}>Audio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    backgroundColor: '#0075FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    height: 50,
    borderRadius: 5,
  },
  lable: {
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: 14,
    marginLeft: 20,
  },
});

export default AudioPlayer;
