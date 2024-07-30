import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import Loading from '../components/Loading';
import BackButtonHeader from '../components/BackButtonHeader';
import {useRoute} from '@react-navigation/native';

const WebViewComponent = () => {
  const [load, setLoad] = useState(true);
  const {params}: any = useRoute();
  console.log(params?.url);

  return (
    <>
      <BackButtonHeader />
      <WebView
        onLoadEnd={() => setLoad(false)}
        renderLoading={() => <Loading />}
        source={{uri: params.url}}
        style={{flex: 1}}
      />
    </>
  );
};

export default WebViewComponent;
