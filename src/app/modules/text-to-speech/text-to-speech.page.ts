import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import { TTSOptions, TextToSpeech } from '@capacitor-community/text-to-speech';


@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.page.html',
  styleUrls: ['./text-to-speech.page.scss'],
})
export class TextToSpeechPage implements OnInit {
  // private readonly GH_URL =
  //   'https://github.com/capacitor-community/text-to-speech';
  // public formGroup = new UntypedFormGroup({
  //   text: new UntypedFormControl(''),
  //   lang: new UntypedFormControl(),
  //   rate: new UntypedFormControl(1),
  //   pitch: new UntypedFormControl(1),
  //   volume: new UntypedFormControl(1),
  //   voice: new UntypedFormControl(),
  //   category: new UntypedFormControl('ambient'),
  // });
  // public supportedLanguages: string[] = [];
  // public supportedVoices: SpeechSynthesisVoice[] = [];
  myText = 'Vamos começar agora';
  recording = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    SpeechRecognition.requestPermissions();
  }

  async startRecognition() {
    const { available } = await SpeechRecognition.available();

    if (available) {
      this.recording = true;
      SpeechRecognition.start({
        language: "pt-BR",
        // maxResults: 2,
        prompt: "Say something",
        partialResults: true,
        popup: false,
      });

      SpeechRecognition.addListener("partialResults", (data: any) => {
        console.log("partialResults was fired", data.matches);
        if (data.matches && data.matches.length > 0) {
          this.myText = data.matches[0];
          this.changeDetectorRef.detectChanges();
        }

      });
    }
  }

  async stopRecognition() {
    this.recording = false;
    await SpeechRecognition.stop();
  }


  public spekText(): void {
    const options: TTSOptions = {
      text: this.myText,
      lang: 'pt-BR',
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      category: 'ambient',
    };

    TextToSpeech.speak(options)
  }

  public ngOnInit(): void {
    // TextToSpeech.getSupportedLanguages().then(result => {
    //   this.supportedLanguages = result.languages;
    // });
    // TextToSpeech.getSupportedVoices().then(result => {
    //   this.supportedVoices = result.voices;
    // });
  }

  public openOnGithub(): void {
    // window.open(this.GH_URL, '_blank');
  }

  public async speak(): Promise<void> {
    // const options: TTSOptions = {
    //   text: this.formGroup.get('text')?.value,
    //   lang: this.formGroup.get('lang')?.value,
    //   rate: this.formGroup.get('rate')?.value,
    //   pitch: this.formGroup.get('pitch')?.value,
    //   volume: this.formGroup.get('volume')?.value,
    //   voice: this.formGroup.get('voice')?.value,
    //   category: this.formGroup.get('category')?.value,
    // };
    // await TextToSpeech.speak(options);
  }

  public async stop(): Promise<void> {
    // await TextToSpeech.stop();
  }

  public async openInstall(): Promise<void> {
    // await TextToSpeech.openInstall();
  }
}
