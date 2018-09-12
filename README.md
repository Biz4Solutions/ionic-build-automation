# Ionic Gulp Build Process

Please go through a demo project on github before you start setting up your own project.

•	You will find a demo project at github -ionicbuild automation. The demo project is presented with a complete gulpfile.js and index.html which you can refer to in your own project. 

•	We have added details of each task in the gulpfile.js itself. After updating your own gulpfile.js, make sure that build is being generated in the www folder using “gulp” command.


 iOS packaging & deployment setup
Please make sure to have following items ready before starting.
1.	A working ionic application with necessary plugins installed.
2.	Mac machine
3.	Xcode 7.x or 8.x with Xcode development tools installed.
4.	An apple developer account. (https://developer.apple.com/programs/)
5.	Distribution certificate and provisioning profile for your application installed in mac & imported in Xcode 
6.	A Gulpfile.js at the root of your ionic project.
We have assumed that you are using following versions: 
•	NodeJS (8.x.x)
•	npm (5.x.x)
•	Cordova (7.x.x) & 
•	Ionic (3.x.x), 


If you are assertive with all the above resources then you are ready for further process. Let’s follow the steps.

1.	Install gulp locally and globally
a.	npm install gulp (Local)
b.	npm install -g gulp (Global)



2.	 Install the following gulp plugins with --save-dev flag. 

	Install all the plugins listed in the following by command npm install <plugin_name> --save-dev. When --save-dev is used, every plug-in we install will be saved in our project’s package.json file, subsequently all plugins will be installed by running npm install and there won’t be any need to install each plug-in separately.

•	del 			// for deleting files and folders
•	yargs 			// for accepting command line arguments
•	gulp-load-plugins	// for loading all plugins
•	run-sequence 	// for sequencing gulp tasks
•	gulp-util 		// gulp utility plugin
•	gulp-cached 		// caching of files
•	gulp-concat 		// concatenate files
•	gulp-if 		// for handling conditions
•	gulp-inject	 	// inject JS and CSS files
•	gulp-minify-css 	// minify css files
•	gulp-ng-annotate 	// sort angular files and resolve dependencies
•	gulp-minify-html 	// minify html files
•	gulp-ng-html2js 	// for converting HTML files to JS
•	gulp-rename 		// renames file or folder name
•	gulp-replace 		// replaces string 

•	gulp-sass 		// convert sass files to css 
◦	This is optional plugin, install it only if you are using sass files.
◦	If you are using LESS css, then there is a similar plugin available to convert the LESS files to css files.

•	gulp-strip-debug 	// for removing all the consoles in JS files
•	gulp-uglify 		// uglify js files
•	gulp-cheerio 		// for editing XML files

	After installing all the plugins, update your gulpfile.js with the build tasks by referring gulpfile.js of demo project


3.	Set up the provisioning profile for iOS build

a.	Download the development & distribution provisioning profiles from Apple Developer account.
b.	Install provisioning profiles into your Xcode and Mac.
c.	Right click and open <Your_Provisioning_Profile_Name>.mobileprovision files in plain text reader, keep it open for the next step.




4.	Create “build.json” file in root directory of your project

a.	Content of build.json for XCode versions less than XCode 8. 
i.	Search for the UUID in opened provisioning profile. Copy the hexadecimal format ID in the <string> tag following UUID and paste it to the respective places as shown in the following content.
	
{
	"ios": {
		"debug": {
			"codeSignIdentitiy": "iPhone Developer",
			"provisioningProfile": "<Copy dev. prov. profile UUID here>"
		},
		"release": {
			"codeSignIdentitiy": "iPhone Distribution",
			"provisioningProfile": "<Copy dist. prov. profile UUID here>"
		}
	}
}



b.	Content of build.json for XCode versions greater or equal to XCode 8

i.	Search for the TeamIdentifier key in the opened files of provisioning profile. 
ii.	Copy the alphanumeric <string> tag following the <array> tag under TeamIdentifier and paste it to respective places as shown in the following content. 

Get more details for the following content at cordova support for XCode 8 and greater.

 {
     	"ios": {
		"debug": {
  			"developmentTeam": "<Copy team Id here>"
		},
		"release": {
  			"developmentTeam": "<Copy team Id here>",
  			"codeSignIdentity": "iPhone Distribution",
  			"packageType": "app-store"
		}
	},
              
              
 }



5.	Download deliver and fastlane tools 

(https://docs.fastlane.tools/getting-started/ios/setup) and set up for your project. 
a.	Install fastlane - sudo gem install fastlane
b.	Install x-code command line tool – xcode-select --install
c.	Initialize fastlane and deliver - fastlane deliver init

Once you are done with this setup you will have a file in your project which should be similar to the following.
###################### More Options ######################
# If you want to have even more control, check out the documentation
# https://github.com/fastlane/fastlane/blob/master/deliver/Deliverfile.md


###################### Automatically generated ######################
# Feel free to remove the following line if you use fastlane (which you should)

app_identifier "<your application Bundle Identifier>" # The bundle identifier of your app
username "<Some apple developer user name>" # your Apple ID user





6.	Create the following bash scripts.

a.	<Project_Name>_Build.sh
#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
cd ..
gulp --release --iosBuild


▪	This file will help you create iOS build with development provisioning profiles for testing purpose. 

▪	DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )" denotes the directory where bash file is present.
▪	 cd $DIR changes current directory to bash file's directory.
▪	cd .. changes the directory to parent directory of bash file's directory
▪	gulp --release --iosBuild runs the build process and generates the code in 'www' directory and executes the command ionic cordova build ios which creates the ionic build for testing.
		
b.	<Project_Name>_IPA.sh
#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
cd ..
gulp --release --ipa

▪	This bash file will create distribution IPA in today’s date folder which can be further uploaded to Testflight using application loader. 

▪	Before you click this, make sure you have distribution provisioning profile set manually in XCode 8 or greater, for Xcode 7 we have already added entry of provisioning profile in build.json so no changes required in the Xcode settings. 

▪	DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )" denotes the directory where bash file is present.
▪	 cd $DIR changes current directory to bash file's directory.
▪	cd .. changes the directory to parent directory of bash file's directory.
▪	gulp --release --ipa runs the build process and generates the code in 'www' directory and executes the command cordova build ios --device --release which creates the iOS IPA file and copies it to today’s date folder.

▪	It will show a notification popup once the IPA is ready or will return error if any. --svn flag will state if project should be updated before deploying the build.

c.	<Project_Name>_Deploy.sh
#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
cd ..
gulp --release --iosDeploy

▪	This is the magical bash file. It will take care of complete deployment process for you. 

▪	Before you click this, make sure you have distribution provisioning profile set manually in XCode 8 or greater. For Xcode 7 we have already added entry of provisioning profile in build.json. Hence, no changes required in the Xcode settings. 

▪	After verifying your XCode settings, plist file entries and version of application. You may double click it and leave it for a while (It might take 10-15 mins). 

▪	DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )" denotes the directory where bash file is present.
▪	 cd $DIR changes current directory to bash file's directory.
▪	cd .. changes the directory to parent directory of bash file's directory.
▪	gulp --release --iosDeploy runs the build process and generates the code in 'www' directory and executes commands cordova build ios --device --release & fastlane deliver --ipa IPA_PATH --skip_metadata true --skip_screenshots true --force true which create the iOS IPA file and deploy it to Testflight.

▪	It will show a notification popup once the deployment is done or will return error if any. --svn flag will state if project should be updated before deploying the build.


d.	<Project_Name>_Dev_Build.sh
#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
cd ..
gulp --iosBuild

▪	DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )" denotes the directory where bash file is present.
▪	cd $DIR changes current directory to bash file's directory.
▪	cd .. changes the directory to parent directory of bash file's directory.

▪	When “--release” flag is not passed, JS, CSS & HTML files are not minified. So, following command can serve for debugging purpose: gulp --iosBuild
▪	gulp  --iosBuild runs the build process and generates the code in 'www' directory and executes the command ionic cordova build ios which creates the ionic build for debugging.

Till now, we have set up the automation process for iOS deployments. Let us now set up the automation process for packaging Android APK as well.


Android packaging setup

Please make sure to have following items ready before starting.

1.	A working ionic application with necessary plugins installed
2.	Windows/Mac machine
3.	Android SDK
4.	A Gulpfile.js at the root of your ionic project.
5.	Keystore of project 

We have assumed that you are using following versions: 
•	NodeJS (8.x.x)
•	npm (5.x.x)
•	Cordova (7.x.x) & 
•	Ionic (3.x.x), 

If you are assertive with all the above resources, you are ready for further process. Let’s follow the steps.


1.	Install gulp locally and globally (same as iOS process)
2.	Install the required gulp plugins with --save--dev flag (same as iOS process)


3.	Create a keystore file

If keystore file has not been created already, please create it using following command and note down all the details you have provided.

 $ keytool -genkey -v -keystore my_release_key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000


4.	Update the “build.json” file

◦	Update the build.json file, which we have created while setting up iOS process, with following code OR if you are working on packaging android build only then create a new build.json file at the root of your project and add the following code.

◦	Don’t forget to add a comma after iOS block if you have already added iOS specific code in build.json.
	
		
 {
     	"android": {
		"debug": {
			"keystore": "MyProject.keystore",
			"storePassword": "<Keystore password>",
			"alias": "<Keystore alias>",
			"password" : "<Alias password>",
			"keystoreType": ""
		 },
		"relase": {
			"keystore": "MyProject.keystore",
			"storePassword": "<Keystore password>",
			"alias": "<Keystore alias>",
			"password" : "<Alias password>",
			"keystoreType": ""
		}
	}
 }



5.	Create the following bat scripts.

a)	<Project_Name> Android Run on Device.bat
cd /d %~dp0..
gulp --androidRun
cmd.exe

•	This bat file runs the application on device if it is connected to computer and USB debugging is active in the device.

•	cd /d %~dp0..  changes the directory to the directory where bat file is present and goes to its parent directory

•	gulp --androidRun runs the build process and generates the code in 'www' directory and executes the command ionic cordova run android which runs the application on the device for debugging.

b)	<Project_Name> Signed APK.bat
cd /d %~dp0..
gulp --release --signedAPK
cmd.exe

◦	This bat file runs the complete build process and generates the signed APK which will be ready for delivery on play store.

◦	cd /d %~dp0..  changes the directory to the directory where bat file is present and goes to its parent directory

◦	gulp --release --signedAPK runs the build process and generates the code in 'www' directory and executes the command cordova build android --release --buildConfig which creates signed APK using keystore mentioned in the file build.json

◦	It displays a notification popup once the APK is ready

We believe the process mentioned above will be helpful to minimize the time required for cross platform application deployments. It is a smart option for delivering frequent builds. 
Enjoy easy deployments now onwards...!!

