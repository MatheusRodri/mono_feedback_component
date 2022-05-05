import React,{useState} from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'phosphor-react-native';
import {FeedbackType} from "../../components/Widget";
import { styles } from './styles';
import { theme } from '../../theme';
import {feedbackTypes} from "../../utils/feedbackTypes";
import {ScreenshotButton} from "../../components/SreenshotButton";
import {Button} from "../../components/Button";
import {captureScreen} from 'react-native-view-shot';

interface Props{
    feedbackType: FeedbackType;
}


export function Form({feedbackType}: Props) {

    const feedbackTypeInfo = feedbackTypes[feedbackType];

    const [screenshot, setScreenshot] = useState<string | null>(null);


    function handleScreenshot() {
        captureScreen({
            format: 'jpg',
            quality: 0.8,
        })
            .then(uri => setScreenshot(uri))
            .catch(err => console.error(err));
    }

    function handleScreenshotRemove(){
        setScreenshot(null);
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <ArrowLeft size={24} weight="bold" color={theme.colors.text_secondary} />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Image
                        source={feedbackTypeInfo.image}
                        style={styles.image}
                    />
                    <Text style={styles.titleText}>
                        {feedbackTypeInfo.title}
                    </Text>
                </View>
            </View>

        <TextInput 
            multiline
            style={styles.input}
            placeholder="O que está acontecendo?"
            placeholderTextColor={theme.colors.text_secondary}
        />

        <View style={styles.footer}>
            <ScreenshotButton 
                onTakeShot={handleScreenshot}
                onRemoveShot={handleScreenshotRemove}	
                screenshot={screenshot}
            />
            <Button
                isloading={false}
            />
        </View>

        </View>
    );
}