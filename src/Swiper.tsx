import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import type { SwiperProps } from './utils';
import type { TabScreenProps } from './TabScreen';
import { TabsContext } from './context';

function Swiper(props: SwiperProps) {
  const {
    Header,
    Footer,
    theme,
    dark,
    style,
    defaultIndex,
    onChangeIndex,
    iconPosition,
    showTextLabel,
    uppercase,
    mode,
  } = props;
  const [index, setIndex] = React.useState<number>(defaultIndex || 0);
  const goTo = React.useCallback(
    (ind: number) => {
      setIndex(ind);
      onChangeIndex(ind);
    },
    [setIndex, onChangeIndex]
  );

  let children: React.Component<TabScreenProps>[] = props.children;

  const currentScreen = children[index];
  if (!currentScreen || !currentScreen) {
    return null;
  }
  const renderProps = {
    index,
    goTo,
    children,
    theme,
    dark,
    style,
    offset: undefined,
    position: undefined,
    iconPosition,
    showTextLabel,
    uppercase,
    mode,
  };

  return (
    <View style={styles.root}>
      {Header ? <Header {...renderProps} /> : null}
      <TabsContext.Provider value={{ goTo, index }}>
        {currentScreen}
      </TabsContext.Provider>
      {Footer ? <Footer {...renderProps} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default Swiper;
