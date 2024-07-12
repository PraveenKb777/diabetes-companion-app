import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import AudioPlayer from '../components/AudioPlayer';

interface Base {
  head?: string;
  bullet: boolean;
}

export interface BulletTrue extends Base {
  bullet: true;
  desc: string[];
}

export interface BulletFalse extends Base {
  bullet: false;
  desc: string;
}

export type BulletType = BulletTrue | BulletFalse;

export interface IBottomSheetMain {
  head: string;
  bullet?: boolean;
  content?: BulletType[];
  audio?: string;
}

export interface IBottomSheetStrDesc extends IBottomSheetMain {
  bullet?: false;
  desc?: string;
}
export interface IBottomSheetBulletDesc extends IBottomSheetMain {
  bullet?: true;
  desc?: string[];
}

export type IBottomSheetContent = IBottomSheetStrDesc | IBottomSheetBulletDesc;

// export interface IBottomSheetContent {
//   head: string;
//   desc?: string;
//   content?: BulletType[];
// }

interface RBSheetRef {
  open: () => void;

  close: () => void;
}
type opBottomSh = (
  content: IBottomSheetContent,
  maxHeight?: boolean,
  h?: number,
) => void;
interface BottomSheetContextType {
  openBottomSheet: opBottomSh;
  closeBottomSheet: () => void;
}

export const BottomSheetNobullet: FC<{item: BulletType}> = ({item}) => {
  const {head, desc} = item;

  return (
    <Text style={{fontStyle: 'italic'}}>
      <Text
        style={{
          color: '#100F0F',
          fontSize: 16,
          fontWeight: 600,
          fontStyle: 'italic',
        }}>
        {head}:{' '}
      </Text>
      {desc}
    </Text>
  );
};
export const BottomSheetYesbullet: FC<{item: BulletTrue}> = ({item}) => {
  const {head, desc} = item;

  return (
    <>
      <Text
        style={{
          color: '#100F0F',
          fontSize: 16,
          fontWeight: 600,
          fontStyle: 'italic',
        }}>
        {head}:
      </Text>
      {desc.map((e, i) => (
        <Text key={e + i}>
          {'\u25CF'} {'   '}
          <Text style={{fontStyle: 'italic'}}>{e}</Text>
        </Text>
      ))}
    </>
  );
};
const BottomSheetItem: FC<{item: IBottomSheetContent}> = ({item}) => {
  const {head, content, desc, bullet} = item;
  return (
    <View>
      <Text style={{fontSize: 24, fontWeight: 700, color: '#0F0F0F'}}>
        {head}
      </Text>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.20)',
          height: 1,
          width: '90%',
          marginVertical: 16,
          alignSelf: 'center',
        }}
      />
      {desc && !bullet ? (
        <Text style={{fontStyle: 'italic'}}>{desc}</Text>
      ) : desc && bullet ? (
        desc.map((e, i) => (
          <Text key={e + i}>
            {'\u25CF'} {'   '}
            <Text style={{fontStyle: 'italic'}}>{e}</Text>
          </Text>
        ))
      ) : null}
      {content?.map((e, i) => {
        return e.bullet ? (
          <BottomSheetYesbullet key={e.head! + i} item={e} />
        ) : (
          <BottomSheetNobullet key={e.head! + i} item={e} />
        );
      })}
      {item.audio ? <AudioPlayer url={item.audio} /> : null}
    </View>
  );
};

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined,
);

export const useBottomSheet = (): BottomSheetContextType => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};

export const BottomSheetProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const bottomSheetRef = useRef<RBSheetRef>(null);
  const [items, setItems] = useState<IBottomSheetContent>();
  const [height, setHeight] = useState<number>(0);
  const [maxH, setMaxH] = useState<boolean>(false);

  const openBottomSheet: opBottomSh = (content, maxHeight = false, h) => {
    setItems(content);
    h && setHeight(h);
    setMaxH(maxHeight);
    bottomSheetRef.current?.open();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <BottomSheetContext.Provider value={{openBottomSheet, closeBottomSheet}}>
      {children}
      <RBSheet
        ref={bottomSheetRef}
        draggable={true}
        // useNativeDriver={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          container: [
            {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              padding: 20,
              maxHeight: (Dimensions.get('window').height * 70) / 100,
            },
            maxH ? {height: (Dimensions.get('window').height * 70) / 100} : {},
            height ? {height: height} : {},
          ],
          draggableIcon: {
            backgroundColor: '#9D9D9D',
          },
        }}>
        <ScrollView>
          <BottomSheetItem item={items!} />
        </ScrollView>
      </RBSheet>
    </BottomSheetContext.Provider>
  );
};
