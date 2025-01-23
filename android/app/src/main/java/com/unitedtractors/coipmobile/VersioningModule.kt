package com.unitedtractors.coipmobile

import com.unitedtractors.coipmobile.BuildConfig;
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class VersioningModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName() = "VersioningModule"

    override fun getConstants() : MutableMap<String, Any> {
        val versionCode = BuildConfig.VERSION_CODE
        val versionName = BuildConfig.VERSION_NAME
        val constants: MutableMap<String, Any> = mutableMapOf()
        constants["VERSION_CODE"] = versionCode
        constants["VERSION_NAME"] = versionName
        return constants
    }
}