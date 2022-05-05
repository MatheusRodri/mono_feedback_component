import React from 'react';
import { Text,TouchableOpacity,TouchableOpacityProps,ActivityIndicator } from 'react-native';
import { theme } from '../../theme';

import { styles } from './styles';




interface Props extends TouchableOpacityProps{
    isloading : boolean;
}


export function Button({isloading,...rest}:Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}> 
        {
            isloading
            ?
            <ActivityIndicator size="small" color={theme.colors.text_on_brand_color} />
            :
            <Text style={styles.title}>
                Enviar Feedback
            </Text>
        
        }
    </TouchableOpacity>
  );
}