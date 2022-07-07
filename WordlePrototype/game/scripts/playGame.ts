enum letterState {
    PERFECT, //문자가 올바른 위치에 있을 때
    CONRECT, //문자가 존재하지만 올바른 위치에 있지 않을 때
    WRONG, //문자가 존재하지 않을 때
}

//scene을 상속받는 클래스
export class PlayGame extends Phaser.Scene {
    words : string[]; //모든 단어들이 포함된 배열

    wordText : Phaser.GameObjects.Text; //플레이어가 쓰는 단어를 보여주는 텍스트
    resultText : Phaser.GameObjects.Text; //결과를 표시할 텍스트

    currentWord : string; //현재 단어를 저장할 문자열
    wordToGuess : string; //추측할 단어를 저장할 문자열

    constructor() {
        super({
            key : 'PlayGame'
        });
    }

    create() : void {
        //json에서 로드된 단어들을 배열에 저장
        this.words = this.cache.json.get('words');

        //시작할때 현재 단어를 초기화해준다
        this.currentWord = "";

        //추측할 단어를 랜덤으로 가져온다
        this.wordToGuess = this.words[Phaser.Math.Between(0, this.words.length - 1)].toUpperCase();

        //정적 텍스트
        this.add.text(10, 10, 'Word to guess' + this.wordToGuess , {
            font : '32px arial',
            color : '#ffff00'
        });

        //또다른 정적 텍스트
        let staticText : Phaser.GameObjects.Text = this.add.text(10, 50, 'Your word: ', {
            font : '32px arial',
            color : '00ffff'
        });

        //플레이어가 쓸 텍스트
        this.wordText = this.add.text(staticText.getBounds().right, 50, '', {
            font : '32px arial'
        });

        //결과를 보여줄 텍스트
        this.resultText = this.add.text(10, 90, '', {
            font : '32px arial',
            color : '#ff00ff'
        });

        //updateWord 함수를 호출하기 위한 keydown listener
        this.input.keyboard.on('keydown', this.updateWord, this);
    }

    //단어의 업데이트가 필요할때마다 호출되는 함수
    updateWord(e : KeyboardEvent) : void {
        //누른 키를 변수에 저장
        let key : string = e.key;

        //스페이스바라면 재시작
        if(key == ' ') {
            this.scene.start('PlayGame');
            return;
        }

        //한글자 이상 입력했고 눌린 키가 백스페이스 라면
        //마지막 문자 제거
        if(key == 'Backspace' && this.currentWord.length > 0) {
            this.currentWord = this.currentWord.slice(0, -1);
            this.wordText.setText(this.currentWord);
            return;
        }

        //한 글자만 입력할 수 있는 정규식
        const regex = /^[a-zA-Z]{1}$/;

        //입력받은 키가 문자이고 입력한 단어가 5자 미만일 경우
        //문자를 더한다
        if(regex.test(key) && this.currentWord.length < 5) {
            this.currentWord += e.key.toUpperCase();
            this.wordText.setText(this.currentWord);
            return;
        }

        //엔터가 입력된 경우 결과값과 비교한다
        if(key == 'Enter') {
            //단어의 길이가 5글자일때만 결과 확인
            if(this.currentWord.length == 5) {
                //맞는 단어인지 확인
                if(this.words.includes(this.currentWord.toLowerCase())) {
                    //처음에는 모두 WORNG으로 세팅
                    let result : number[] = Array(5).fill(letterState.WRONG);

                    //추측할 단어가 담긴 임시 문자열
                    let tempWord : string = this.wordToGuess;

                    //모든 문자에 대해 반복 수행
                    for (let i : number = 0; i < 5; i++) {
                        //현재 단어의 i번째와 추측할 단어의 i번째가 일치하는지
                        if(this,this.currentWord.charAt(i) == tempWord.charAt(i)) {
                            //일치하면 PERFECT로
                            result[i] = letterState.PERFECT;

                            //임시 문자열에서 i번째 단어 제거
                            tempWord = this.removeChar(tempWord, i);
                        }
                        else {
                            //추측할 단어의 모든 문자에 대해 반복 수행
                            for (let j : number = 0; j < 5; j++) {
                                //현재 단어의 i번째 문자와 추측할 단어의 j번쨰 문자가 같고 현재 단어의 j번째 문자와 추측할 단어의 j번째 문자가 다르면
                                if(this.currentWord.charAt(i) == this.wordToGuess.charAt(j) && this.currentWord.charAt(j) != this.wordToGuess.charAt(j)) {
                                    //correct값 부여
                                    result[i] = letterState.CONRECT;

                                    //임시 문자열에서 j번째 단어 제거
                                    tempWord = this.removeChar(tempWord, j);
                                    break;
                                }
                            }
                        }
                    }

                    //결과를 보여주는 부분
                    let reslutString : string = '';
                    
                    //모든 result항목을 반복하고 그에 따라 결과 resultString구성
                }
            }
        }
    }

    //문자열으 index번째 문자를 _로 바꿔주는 함수
    //일치하지 않는 문자로 바꾸기 위해
    removeChar(initialString : string, index : number) : string {
        return initialString.substring(0, index) + '_' + initialString.substring(index + 1);
    }
}