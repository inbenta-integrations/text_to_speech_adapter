# TEXT TO SPEECH CHATBOT ADAPTER

### Table of Contents
* [Description](#description)
* [Installation](#installation)
* [Configuration](#configuration)
* [Integration example](#integration-example)

## Description
This adapter for the Inbenta Chatbot SDK converts all the text answers into voice using the external library [ResponsiveVoice&trade;](https://responsivevoice.org/)
## Installation
In order to add this adapter to your SDK, you need to import the file `/src/adapters/text-to-speech-adapter.js` into your HTML/JS file where you're building the SDK. Then, append it to the SDK adapters array providing the adapter configuration as shown in the [example](#integration-example) section.

## Configuration
This adapter expects a Javascript object containing all these configuration parameters:
- **voice (string)**: Voice name from https://responsivevoice.org/text-to-speech-languages/
 - **readSideWindowContent (boolean)**: If enabled also reads the sideWindow content along with the answer text.
 - **useMessagesQueue (boolean)**: If enabled, all incoming messages are stacked and played in order. If disabled, stops playing the current message when a new one is received.

This would be a valid configuration object:
```javascript
    var textToSpeechConfiguration = {
        voice: "UK English Female",
        readSideWindowContent: true,
        useMessagesQueue: false
    }
```
## Integration example
In the following example we're creating a chatbot with the text-to-speech adapter:
* Import the Inbenta Chatbot SDK (check the last available version [here](https://developers.inbenta.io/chatbot/javascript-sdk/sdk-subresource-integrity))
    ```html
    <script src="https://sdk.inbenta.io/chatbot/SDK_VERSION/inbenta-chatbot-sdk.js"></script>
    ```
* Import the text-to-speech adapter from `src/adapters/text-to-speech-adapter.js`
    ```html
     <script src="./src/adapters/text-to-speech-adapter.js"></script>
    ```
* Create a configuration object with both SDK and our custom adapter configuration
    ```javascript
    var inbApp = {
        // Inbenta Chatbot SDK credentials
        sdkAuth: {
            inbentaKey: '<your-api-key>',
            domainKey: '<your-domain-key>'
        },
        // Inbenta Chatbot SDK configuration
        sdkConfig: {
            chatbotId: 'text_to_speech_demo',
            labels: {
                en: {
                    'interface-title': 'Text to Speech Demo'
                }
            },
            adapters: []
        },
        // Text to speech adapter configuration
        customConfig: {
            textToSpeechAdapterConfig: {
                voice: 'UK English Female',  
                readSideWindowContent: true,
                useMessagesQueue: false
            }
        }
    };
    ```
* Add the adapter to the SDK adapters array (passing the adapter configuration object)
    ```javascript
    inbApp.sdkConfig.adapters.push(textToSpeechAdapter(inbApp.customConfig.textToSpeechAdapterConfig));
    ```
* Build the chatbot with our SDK configuration and credentials
    ```javascript
      window.InbentaChatbotSDK.buildWithDomainCredentials(inbApp.sdkAuth, inbApp.sdkConfig);
    ```

Here is the full integration code:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title>Inbenta text-to-speech chatbot demo</title>
    <link rel="shortcut icon" href="#" />
    
    <!-- Import the Inbenta Chatbot SDK (check the last available version [here](https://developers.inbenta.io/chatbot/javascript-sdk/sdk-subresource-integrity)) -->
    <script src="https://sdk.inbenta.io/chatbot/SDK_VERSION/inbenta-chatbot-sdk.js"></script>
    
    <!-- Import the text-to-speech chatbot adapter -->
    <script src="./src/adapters/text-to-speech-adapter.js"></script>
  </head>
  <body>
    <!-- INBENTA CHATBOT SDK -->
    <script type="text/javascript">
      var inbApp = {
        // Inbenta Chatbot SDK credentials
        sdkAuth: {
          inbentaKey: '<YOUR_API_KEY>',
          domainKey: '<YOUR_DOMAIN_KEY>'
        },
        // Inbenta Chatbot SDK configuration
        sdkConfig: {
          chatbotId: 'text_to_speech_demo',
          labels: {
            en: {
              'interface-title': 'Text to Speech Demo'
            }
          },
          adapters: []
        },
        // Text to speech adapter configuration
        customConfig: {
          textToSpeechAdapter: {
            voice: 'UK English Female',  
            readSideWindowContent: true,
            useMessagesQueue: false
          }
        }
      };

      // Add the text-to-speech adapter to the chatbot SDK
      inbApp.sdkConfig.adapters.push(textToSpeechAdapter(inbApp.customConfig.textToSpeechAdapter));

      // Build Inbenta Chatbot SDK
      window.InbentaChatbotSDK.buildWithDomainCredentials(inbApp.sdkAuth, inbApp.sdkConfig);
    </script>
  </body>
</html>
```
