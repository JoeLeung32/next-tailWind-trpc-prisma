export const nunito = fetch(
    new URL(
        '../../../public/static/fonts/nunito/Nunito-Regular.ttf',
        import.meta.url
    )
).then((res) => res.arrayBuffer())

export const nunitoLight = fetch(
    new URL(
        '../../../public/static/fonts/nunito/Nunito-Light.ttf',
        import.meta.url
    )
).then((res) => res.arrayBuffer())

export const nunitoBold = fetch(
    new URL(
        '../../../public/static/fonts/nunito/Nunito-Bold.ttf',
        import.meta.url
    )
).then((res) => res.arrayBuffer())
