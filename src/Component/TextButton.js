import React from 'react'

import { COLORS,FONTS } from '../Theme/Theme'

export default function TextButton({
    disabled,
    label,
    labelStyle,
    onPress,
    icon,
    iconStyle,
    buttonContainerStyle,
    loading,
    border=true
}) {
    
  return (
      <>
        <button onClick={onPress}
        disabled={disabled}
        style={{
            display:"inline-flex",
            justifyContent: 'center',
            backgroundColor: COLORS.white,
            borderWidth:0,
            height:50,
            alignSelf:'center',
            cursor:"pointer",
            paddingInline:25,
            ...buttonContainerStyle,
        }}
        >
        <p style={{ color: COLORS.Primary, ...FONTS.body2,alignSelf:"center",letterSpacing:1, ...labelStyle }}>
        {label}
        </p>
        </button>
    </>
  )
}