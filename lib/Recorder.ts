export class Recorder {
  private readonly SpeechRecognition: SpeechRecognition
  private readonly SpeechGrammarList: SpeechGrammarList
  private readonly RecognitionEvent: {
    new (
      type: string,
      eventInitDict: SpeechRecognitionEventInit
    ): SpeechRecognitionEvent
    prototype: SpeechRecognitionEvent
  }

  // =
  // window?.SpeechRecognitionEvent || window?.webkitSpeechRecognitionEvent

  private permission: boolean
  private stream?: MediaStream
  private track?: MediaStreamTrack
  private recognitionHistory: string[] = []

  constructor() {
    if (typeof window === 'undefined') {
      throw new Error('서버 환경에서 사용할 수 없습니다.')
    }
    const Recognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    const GrammarList =
      window.SpeechGrammarList || window.webkitSpeechGrammarList

    this.SpeechRecognition = new Recognition()
    this.SpeechGrammarList = new GrammarList()
    this.RecognitionEvent =
      window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent
    this.permission = false
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

  async start(options: { callback: (result: string) => void; lang: string }) {
    if (!this.permission || !this.track) {
      await this.requestPermission()
    }
    const { callback, lang } = options
    this.SpeechRecognition.lang = lang ?? 'ko'
    this.SpeechRecognition.interimResults = false
    this.SpeechRecognition.continuous = false
    this.SpeechRecognition.maxAlternatives = 10
    this.SpeechRecognition.start()
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
    window.removeEventListener('click', this.disableClick)
  }

  getStream() {
    return this.stream
  }

  private disableClick(event: MouseEvent) {
    this.stop()
  }
}
