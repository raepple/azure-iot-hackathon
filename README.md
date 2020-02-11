# Azure IoT Hackathon

## Outline
In this IoT scenario of the Azure Hackathon, we will use [MXCHIP IoT DevKit](https://microsoft.github.io/azure-iot-developer-kit/) as our main IoT physical devices.

These kits are equipied with OLED display, headphone, microphone, sensors like temperature, humidity, motion, pressure and Wifi helping us to build flexible IoT projects quickly. In addition to the DevKit, we would need (depending on the use-case):<br>

1) Azure subscription
2) Azure IoT Hub
3) Azure Stream Analytics 
4) Azure Machine Learning Service / Azure Machine Learning Studio (Classic)
5) Azure Cognitive Services
6) Azure Functions

A number of example projects using IoT DevKit can be found [here](https://microsoft.github.io/azure-iot-developer-kit/docs/projects/), including: 
1) [Remote montitoring of temprature, pressure, humidity](https://docs.microsoft.com/en-us/azure/iot-accelerators/iot-accelerators-arduino-iot-devkit-az3166-devkit-remote-monitoring-v2)<br>
2) [Creating a door monitor](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-arduino-iot-devkit-az3166-door-monitor)<br>
3) [Making a voice translator using Azure Cognitive Services](https://docs.microsoft.com/en-us/samples/azure-samples/mxchip-iot-devkit-translator/sample/)<br>
4) [Sending alerts or tweets triggered by the motion sensor](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-arduino-iot-devkit-az3166-translator)<br>

## Reference architecture

Most of the IoT solutions essentially follow the below reference [architecture](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/iot/):

![alt text](https://docs.microsoft.com/en-us/azure/architecture/reference-architectures/iot/_images/iot.png) <!-- .element height="10%" width="12%" -->

1) IoT devices connect to IoT Hub and start sending messages (see an introduction [here](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-arduino-iot-devkit-az3166-get-started)) 
2) Iot Hub receives and manages messsages from multiple devices ([link](https://docs.microsoft.com/en-us/azure/iot-hub/))
3) Messages from IoT Hub can either being just stored in a storage unit, trigger a fucntion directly (e.g. [here](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-arduino-iot-devkit-az3166-door-monitor)), or being sent to a processing unit like [Azure Stream Analytics](https://docs.microsoft.com/en-us/azure/stream-analytics/)
4) In addition to it's embedded analytical and machine learning capabilities (see [here](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-machine-learning-anomaly-detection)), one can also create bespoke ML models using [Azure Machine Learning Services](https://docs.microsoft.com/en-us/azure/machine-learning/) and expose those models to be called from the Stream Analytics functions (see an example [here](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-machine-learning-integration-tutorial)).

## Hackathon scenario

### [Predicting probability of rain with IoT DevKit](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-weather-forecast-machine-learning)
![alt text](https://docs.microsoft.com/en-us/azure/iot-hub/media/iot-hub-get-started-e2e-diagram/6.png) <!-- .element height="10%" width="12%" -->

We first connect our DevKits to our Azure Event Hubs and start streaming data ([link](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-arduino-iot-devkit-az3166-get-started)), then create an Azure Streaming Analytics job and define [input stream](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-add-inputs)) and [output(s)](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-define-outputs). Using the [historical weather data](https://github.com/mozamani/nextgeniot/blob/master/files/weather_clean.csv), we can build a machine learning classifier that predicts probability of rain based on measured humidity and temprature levels. We then expose this model as a webservice and call the model using a [stream analytcis function](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-scale-with-machine-learning-functions). Now we can query our stream and start predicting weather live. Results can be either written to an output storage unit or a live [PowerBI dashboard](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-power-bi-dashboard).   



## Other scenarios

### AI on Edge

A good example of AI on edge use-cases can be found [here](https://github.com/microsoft/ComputerVision). Microsoft [Computer Vision](https://github.com/microsoft/ComputerVision) provides examples and best practice guidelines for building computer vision systems. All examples are given as Jupyter notebooks, and use PyTorch as the deep learning library.
This [tutorial](https://docs.microsoft.com/en-us/azure/iot-edge/tutorial-deploy-custom-vision) shows how to train and deploy a comoputer vision model on IoT edge devices using the [Custom Vision](https://docs.microsoft.com/en-us/azure/cognitive-services/custom-vision-service/home) service. <br>

![alt text](https://docs.microsoft.com/en-us/azure/iot-edge/media/tutorial-deploy-custom-vision/custom-vision-architecture.png)    

Microsoft and [NVIDIA](https://developer.nvidia.com/deepstream-sdk) extend video analytics to the intelligent edge using [DeepStream SDK](https://azure.microsoft.com/en-us/blog/microsoft-and-nvidia-extend-video-analytics-to-the-intelligent-edge/)
![alt text](https://azurecomcdn.azureedge.net/mediahandler/acomblog/media/Default/blog/e86d2867-40b5-4726-9334-82fb715526f5.jpg)

[This tutorial](https://github.com/Azure-Samples/onnxruntime-iot-edge) shows how to integrate Azure services with machine learning on the NVIDIA Jetson Nano (an ARM64 device) using Python. By the end of this sample, you will have a low-cost DIY solution for object detection within a space and a unique understanding of integrating ARM64 platform with Azure IoT services and machine learning.

![alt text](https://github.com/Azure-Samples/onnxruntime-iot-edge/raw/master/images_for_readme/arch.jpg)

This [repo](https://github.com/Microsoft/vision-ai-developer-kit) contains the components needed to use the [Vision AI Developer Kit](https://azure.github.io/Vision-AI-DevKit-Pages/) to develop Neural Network models which can be deployed to the Vision AI DevKit hardware.

![alt text](https://azure.github.io/Vision-AI-DevKit-Pages/assets/images/Peabody_spec_image.png)


### MLOps with Azure ML

Azure ML contains a number of asset management and orchestration services to help you manage the lifecycle of your model training & deployment workflows.

With [Azure ML + Azure DevOps](https://github.com/Microsoft/MLOps) you can effectively and cohesively manage your datasets, experiments, models, and ML-infused applications.  

![alt text](https://github.com/microsoft/MLOps/raw/master/media/ml-lifecycle.png)


## Useful Links

1) IoT device simulators: [IoT MXChip DevKit simulator](https://azure-samples.github.io/iot-devkit-web-simulator/) + [Github page](https://github.com/Azure-Samples/iot-devkit-web-simulator), [Raspberry Pi simulator](https://azure-samples.github.io/raspberry-pi-web-simulator/#GetStarted) (+ [connection instructions](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-raspberry-pi-web-simulator-get-started)) and [multiple device simulators](https://www.azureiotsolutions.com/Accelerators) + [Githuib page](https://github.com/Azure/device-simulation-dotnet)
2) [Visual Studio Code](https://code.visualstudio.com/download) + [Platform IO IDE](https://platformio.org/install/ide?install=vscode)
3) [Use Azure IoT Tools for Visual Studio Code to send and receive messages between your device and IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-vscode-iot-toolkit-cloud-device-messaging)
4) [Connect an MXChip IoT DevKit device to your Azure IoT Central application](https://docs.microsoft.com/en-us/azure/iot-central/preview/howto-connect-devkit) + [Create an Azure IoT Central application](https://docs.microsoft.com/en-us/azure/iot-central/preview/quick-deploy-iot-central)
5) [Try a cloud-based remote monitoring solution](https://docs.microsoft.com/en-us/azure/iot-accelerators/quickstart-remote-monitoring-deploy)
6) [Cloud City IoT Hack](https://github.com/Azure/CloudIoTHack)
7) [Keyword Spotting on IoT DevKit with ELL](https://github.com/IoTDevEnvExamples/DevKitKeywordSpotter/blob/master/README.md)
8) [Anomaly detection in Azure Stream Analytics](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-machine-learning-anomaly-detection) + [Github repo](https://github.com/Azure/azure-stream-analytics) + [YouTube video](https://www.youtube.com/watch?v=Ra8HhBLdzHE)
9) [Azure Machine Learning Studio (classic) integration in Stream Analytics (Preview)](https://docs.microsoft.com/bs-latn-ba/azure/stream-analytics/stream-analytics-how-to-configure-azure-machine-learning-endpoints-in-stream-analytics)
