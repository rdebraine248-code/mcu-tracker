package io.github.rdebraine248.datapad;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.window.OnBackInvokedDispatcher;

// The datapad, full screen: the live site in one window that runs under the status bar and around the camera (owner, October 2026: One UI 9
// left a grey strip where the hidden status bar had been in the browser's installed app). The status bar stays hidden; a swipe down from
// the top shows it for a moment. The navigation bar is left alone, so a side swipe goes back and a swipe up goes home, as before
public class MainActivity extends Activity {
    static final String HOME = "https://rdebraine248-code.github.io/mcu-tracker/";
    WebView web;
    boolean offline = false;

    @Override protected void onCreate(Bundle saved) {
        super.onCreate(saved);
        getWindow().setDecorFitsSystemWindows(false);   // the page draws edge to edge; it keeps clear of the camera itself (env(safe-area-inset-*))
        web = new WebView(this);
        web.setBackgroundColor(0xFF0B1019);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);   // the saves
        s.setMediaPlaybackRequiresUserGesture(false);
        s.setTextZoom(100);   // the page's own sizes, as the browser shows them
        s.setSupportZoom(false);   // a pinch belongs to the page (the Quantum Realm egg), not to zooming
        web.setWebViewClient(new WebViewClient() {
            // the datapad's own pages stay in the app; anything else opens in the browser
            @Override public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
                Uri u = r.getUrl();
                if (u.toString().startsWith(HOME)) return false;
                try { startActivity(new Intent(Intent.ACTION_VIEW, u)); } catch (Exception e) { }
                return true;
            }
            // no connection and nothing saved yet (the site's own offline copy answers once it has loaded once): a page that says so
            @Override public void onReceivedError(WebView v, WebResourceRequest r, WebResourceError e) {
                if (r.isForMainFrame()) { offline = true; v.loadUrl("file:///android_asset/offline.html"); }
            }
            @Override public void onPageFinished(WebView v, String url) {
                if (offline && url.startsWith(HOME)) { offline = false; v.clearHistory(); }   // back from the datapad never leads to the offline page
            }
        });
        setContentView(web);
        if (saved != null) web.restoreState(saved); else web.loadUrl(HOME);
        // back is the page's own back, as in the browser: it closes what's open, and from the front page it leaves the app
        if (Build.VERSION.SDK_INT >= 33) getOnBackInvokedDispatcher().registerOnBackInvokedCallback(OnBackInvokedDispatcher.PRIORITY_DEFAULT, this::back);
        hideStatusBar();
    }

    void back() { if (web.canGoBack()) web.goBack(); else moveTaskToBack(true); }

    @SuppressWarnings("deprecation")
    @Override public void onBackPressed() { back(); }   // before Android 13

    void hideStatusBar() {
        WindowInsetsController c = getWindow().getInsetsController();
        if (c == null) return;
        c.setSystemBarsBehavior(WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
        c.hide(WindowInsets.Type.statusBars());
    }

    @Override public void onWindowFocusChanged(boolean focus) { super.onWindowFocusChanged(focus); if (focus) hideStatusBar(); }
    @Override protected void onResume() { super.onResume(); web.onResume(); hideStatusBar(); }
    @Override protected void onPause() { web.onPause(); super.onPause(); }
    @Override protected void onSaveInstanceState(Bundle out) { super.onSaveInstanceState(out); web.saveState(out); }
}
