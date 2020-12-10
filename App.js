import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  LogBox,
  Button,
} from 'react-native';
import colors from './src/utils/colors';

import Formulario from './src/components/Formulario';
import Footer from './src/components/Footer';
import ResultCalculation from './src/components/ResultCalculation';

LogBox.ignoreLogs(['Picker has been extracted']);

export default function App() {
  // states
  const [capital, setCapital] = useState(null);
  const [interest, setInterest] = useState(null);
  const [month, setMonth] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {    
    
    if (capital && interest && month) calculate();
    else reset();

  }, [capital, interest, month]);

  const calculate = () => {
    reset();
    if (!capital) {
      setErrorMessage("Añade la cantidad que quieres solicitar");
    } else if (!interest) {
      setErrorMessage("Añade el interes del prestamos");
    } else if (!month) {
      setErrorMessage("Selecciona los meses a pagar");
    } else {
      const i = interest / 100;
      const fee = capital / ((1 - Math.pow(i + 1, -month)) / i);      
      setTotal({
        monthlyFee: fee.toFixed(4).replace(".",","),
        totalPayable: (fee * month).toFixed(4).replace(".",",")
      });     
      
    }
  };

  const reset = () => {
    setErrorMessage("");
    setTotal(null);
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.background} />
        <Text style={styles.titleApp}>Cotizador de Prestamos</Text>
        <Formulario
          setCapital={setCapital}
          setInterest={setInterest}
          setMonth={setMonth}
        />
      </SafeAreaView>

      <View>
        <ResultCalculation 
          capital={capital}
          interest={interest}
          month={month}
          total={total}
          errorMessage={errorMessage}
        />
      </View>

      <Footer calculate={calculate} />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    height: 290,
    alignItems: 'center',
  },
  background: {
    backgroundColor: colors.PRIMARY_COLOR,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'absolute',
    zIndex: -1,
    height: 200,
    width: '100%',
  },
  titleApp: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
});
