const isEnterPress = (e, action) => {
   if (e.key === "Enter") {
      action(e)
   }
}

export default isEnterPress;