import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function UserFill(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        fill="currentColor"
        d="M19.652 19.405c.552-.115.882-.693.607-1.187-.606-1.087-1.56-2.043-2.78-2.771C15.907 14.509 13.98 14 12 14c-1.981 0-3.907.508-5.479 1.447-1.22.728-2.174 1.684-2.78 2.771-.275.494.055 1.072.607 1.187a37.503 37.503 0 0015.303 0"
      />
      <Circle cx={12} cy={8} r={5} fill="currentColor" />
    </Svg>
  )
}

export default UserFill
