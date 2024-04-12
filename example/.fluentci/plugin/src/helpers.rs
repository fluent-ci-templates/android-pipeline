use anyhow::Error;
use fluentci_pdk::dag;

pub fn setup_jdk() -> Result<(), Error> {
    let mut jdk_version = dag().get_env("JDK_VERSION").unwrap_or("17.0.7+7".into());
    if jdk_version.is_empty() {
        jdk_version = "17.0.7+7".into();
    }

    dag()
        .devbox()?
        .with_exec(vec![
            "devbox",
            "global",
            "add",
            &format!("jdk@{}", jdk_version),
        ])?
        .stdout()?;

    Ok(())
}

pub fn setup_android_sdk() -> Result<(), Error> {
    let mut os = dag().get_os()?;

    if os == "macos" {
        os = "mac".into();
    }

    let mut android_platform_version = dag()
        .get_env("ANDROID_PLATFORM_VERSION")
        .unwrap_or("34".into());
    if android_platform_version.is_empty() {
        android_platform_version = "34".into();
    }

    let mut android_build_tools_version = dag()
        .get_env("ANDROID_BUILD_TOOLS_VERSION")
        .unwrap_or("34.0.0".into());
    if android_build_tools_version.is_empty() {
        android_build_tools_version = "34.0.0".into();
    }

    let mut android_sdk_tools_version = dag()
        .get_env("ANDROID_SDK_TOOLS_VERSION")
        .unwrap_or("9477386".into());

    if android_sdk_tools_version.is_empty() {
        android_sdk_tools_version = "9477386".into();
    }

    let android_home = dag().get_env("ANDROID_HOME").unwrap_or_default();

    if !android_home.is_empty() {
        return Ok(());
    }

    let path = dag()
        .get_env("PATH")
        .unwrap_or("/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin".into());

    let home = dag().get_env("HOME").unwrap_or("/root".into());

    dag().set_envs(vec![(
        "ANDROID_HOME".into(),
        format!("{}/android-sdk", home),
    )])?;

    dag().set_envs(vec![(
        "PATH".into(),
        format!("{}:{}/android-sdk/cmdline-tools/latest/bin", path, home),
    )])?;

    dag()
        .pkgx()?
        .with_packages(vec!["curl", "wget", "unzip", "openjdk.org"])?
        .with_exec(vec![
            &format!("mkdir -p $ANDROID_HOME && wget --output-document=$ANDROID_HOME/cmdline-tools.zip https://dl.google.com/android/repository/commandlinetools-{}-{}_latest.zip", os, android_sdk_tools_version)])?
        .with_exec(vec!["cd $ANDROID_HOME && rm -rf cmdline-tools && unzip -d cmdline-tools cmdline-tools.zip && mv cmdline-tools/cmdline-tools cmdline-tools/latest
        "])?
        .with_exec(vec![
            "sdkmanager",
            "--version",
        ])?
        .with_exec(vec![
            "sdkmanager",
            &format!("platforms;android-{}", android_platform_version),
            &format!("build-tools;{}", android_build_tools_version),
        ])?
        .with_exec(vec![
            "yes | sdkmanager --licenses",
        ])?
        .stdout()?;

    Ok(())
}
