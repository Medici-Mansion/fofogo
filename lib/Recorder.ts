export class Recorder {
  private static instance: Recorder
  private readonly SpeechRecognition: SpeechRecognition =
    new (window.webkitSpeechRecognition || window.SpeechRecognition)()

  private permission: boolean = false
  private stream?: MediaStream
  private track?: MediaStreamTrack
  private recognitionHistory: string[] = []
  private static listners: ((state: boolean) => void)[] = []

  public recordingState = false

  public static getInstance() {
    if (typeof window === 'undefined') {
      throw new Error('서버 환경에서 사용할 수 없습니다.')
    }
    if (Recorder.instance) {
      return Recorder.instance
    }
    Recorder.instance = new Recorder()
    return Recorder.instance
  }

  async requestPermission() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia(
        // constraints - only audio needed for this app
        {
          audio: true,
        }
      )
      this.stream = stream
      this.permission = true
      this.track = this.stream.getAudioTracks()?.[0]
    } else {
      console.log('getUserMedia not supported on your browser!')
    }
  }

  addListner(stateListner: (state: boolean) => void) {
    Recorder.listners.push(stateListner)
  }
  getListner() {
    return Recorder.listners
  }

  clearListner() {
    Recorder.listners = []
  }

  async start(options: { callback: (result: string) => void; lang: string }) {
    if (this.recordingState) {
      return this.stop()
    }
    if (!this.permission || !this.track) {
      await this.requestPermission()
    }
    const { callback, lang } = options
    this.SpeechRecognition.lang = lang ?? 'ko'
    this.SpeechRecognition.interimResults = false
    this.SpeechRecognition.continuous = false
    this.SpeechRecognition.maxAlternatives = 10
    this.SpeechRecognition.start()
    this.recordingState = true
    Recorder.listners.forEach((listener) => listener(this.recordingState))
    this.SpeechRecognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript
      callback(speechResult)
      this.recognitionHistory.push(speechResult)
    }

    this.SpeechRecognition.onaudiostart = (event) => {
      window.addEventListener('click', this.disableClick)
      console.log('SpeechRecognition.onaudiostart')
    }

    this.SpeechRecognition.onend = (event) => {
      console.log('SpeechRecognition.onend')
      this.stop()
    }

    this.SpeechRecognition.onnomatch = function (event) {
      console.log('SpeechRecognition.onnomatch')
    }

    this.SpeechRecognition.onspeechstart = function (event) {
      console.log('SpeechRecognition.onspeechstart')
    }
    this.SpeechRecognition.onstart = function (event) {
      console.log('SpeechRecognition.onstart')
    }
  }

  stop() {
    this.track?.stop()
    this.recordingState = false
    window.removeEventListener('click', this.disableClick)
    Recorder.listners.forEach((listener) => listener(this.recordingState))
  }

  getStream() {
    return this.stream
  }

  getRecognitionHistory() {
    return this.recognitionHistory
  }

  private disableClick = (event: MouseEvent) => {
    this.SpeechRecognition.stop()
    this.stop()
  }
}
