const secondsToStringTime = (lengthInSeconds: number): string => {
  const fullSeconds: number = lengthInSeconds > 0 ? lengthInSeconds : 0
  let minutes: number = Math.floor(fullSeconds / 60)
  const restSeconds: number = fullSeconds - minutes * 60

  let m: string = ""
  if (minutes <= 0) {
    m = "00"
  } else if (minutes < 10) {
    m = `0${minutes}`
  } else {
    m = minutes.toString()
  }

  let s: string = ""
  if (restSeconds <= 0) {
    s = "00"
  } else if (restSeconds < 10) {
    s = `0${restSeconds}`
  } else {
    s = restSeconds.toString()
  }

  return fullSeconds === 0 ? "" : `${m}:${s}`
}

export { secondsToStringTime }
