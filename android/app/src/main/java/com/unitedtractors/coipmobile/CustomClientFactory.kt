package com.unitedtractors.coipmobile

import android.content.res.Resources
import com.datatheorem.android.trustkit.TrustKit
import com.facebook.react.modules.network.OkHttpClientFactory
import com.facebook.react.modules.network.OkHttpClientProvider
import com.facebook.react.modules.network.ReactCookieJarContainer
import okhttp3.OkHttpClient
import java.util.concurrent.TimeUnit

class CustomClientFactory(private val hostname: String) : OkHttpClientFactory {

    override fun createNewNetworkModuleClient(): OkHttpClient {
        val client = OkHttpClient.Builder()
            .connectTimeout(0, TimeUnit.MILLISECONDS)
            .readTimeout(0, TimeUnit.MILLISECONDS)
            .writeTimeout(0, TimeUnit.MILLISECONDS)
            .cookieJar(ReactCookieJarContainer())
            .sslSocketFactory(
                TrustKit.getInstance().getSSLSocketFactory(hostname),
                TrustKit.getInstance().getTrustManager(hostname)
            )

        return client.build()
    }
}

