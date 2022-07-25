import { createTheme } from '@mui/material/styles'
import { TypographyOptions } from '@mui/material/styles/createTypography'
import { deepmerge } from '@mui/utils'

const getTheme = () => {
  let theme = createTheme({
    palette: {},
  })

  const fontFamily = ['Roboto', 'Prompt', 'sans-serif'].join(',')

  const customTypography: TypographyOptions = {
    htmlFontSize: 16,
    fontFamily,
  }

  theme = deepmerge(theme, {
    typography: customTypography,
  })

  return theme
}

export const theme = getTheme()
