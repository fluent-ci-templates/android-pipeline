use extism_pdk::*;
use fluentci_pdk::dag;

use crate::helpers::{setup_android_sdk, setup_jdk};

pub mod helpers;

#[plugin_fn]
pub fn setup() -> FnResult<String> {
    setup_jdk()?;
    setup_android_sdk()?;

    Ok("Setup completed".into())
}

#[plugin_fn]
pub fn assemble_release(args: String) -> FnResult<String> {
    setup_jdk()?;
    setup_android_sdk()?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec![
            r#"
            eval "$(devbox global shellenv --recompute)"
            ./gradlew assembleRelease"#,
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn assemble_debug(args: String) -> FnResult<String> {
    setup_jdk()?;
    setup_android_sdk()?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec![
            r#"
            eval "$(devbox global shellenv --recompute)"
            ./gradlew assembleDebug"#,
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn lint_debug(args: String) -> FnResult<String> {
    setup_jdk()?;
    setup_android_sdk()?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec![
            r#"
            eval "$(devbox global shellenv --recompute)"
            ./gradlew -Pci --console=plain :app:lintDebug -PbuildDir=lint"#,
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn debug_tests(args: String) -> FnResult<String> {
    setup_jdk()?;
    setup_android_sdk()?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec![
            r#"
            eval "$(devbox global shellenv --recompute)"
            ./gradlew -Pci --console=plain :app:testDebug"#,
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn bundle_release(args: String) -> FnResult<String> {
    setup_jdk()?;
    setup_android_sdk()?;

    let stdout = dag()
        .devbox()?
        .with_exec(vec![
            r#"
            eval "$(devbox global shellenv --recompute)"
            ./gradlew bundleRelease"#,
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}
