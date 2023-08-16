interface DefaultMetadataArgs {
  title?: string
}
export const getDefaultMetadata = (options: DefaultMetadataArgs = {}) => {
  const { title } = options
  return {
    title: '포포-고' + (title ?? ''),
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
      userScalable: false,
    },
  }
}
