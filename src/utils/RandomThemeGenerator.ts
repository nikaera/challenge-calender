export default class RandomThemeGenerator {
    theme: string;

    constructor(theme: string) {
        this.theme = theme
    }

    public createRandomWords(): string[] {
        return this.shuffle(this.themePrefixes()).map(p => `${p}${this.theme}`)
    }

    private shuffle(array: string[]) {
        for (let i = array.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    private themePrefixes(): string[] {
        return [
            "最近好きな",
            "思い出深い",
            "小学生の時好きだった",
            "中学の時好きだった",
            "高校の時好きだった",
            "大学の時好きだった",
            "大人になってから好きになった",
            "名前に色が入っている",
            "名前に数字が入っている",
            "光に関連した",
            "闇に関連した",
            "人の名前が入っている",
            "春を思い出させる",
            "夏を思い出させる",
            "秋を思い出させる",
            "冬を思い出させる",
            "楽しい気分にさせてくれる",
            "決して飽きることのない",
            "ずっと前からお気に入りの",
            "自分にとってたくさんの意味がある",
            "自分にとって大切な",
            "自分の中で大ヒットした",
            "自分の中で一番ヤバかった",
            "前向きにさせてくれる",
            "全人類が経験すべき",
            "自分自身を表す",
            "子供の頃から覚えている",
            "周囲にオススメしたい",
            "退屈な気分を吹き飛ばす",
            "アッパーな気分になれる",
            "ダウナーな気分になれる",
            "良い意味で壊れた",
            "味わい深い",
            "ある時突然評価が 180度変わった",
            "内省したい気分になる",
            "あんま周囲に公言してないけど実は大好きな",
            "一生飽きない気がする",
            "眠気が吹き飛ぶ",
            "一旦落ち着きたい時の",
            "出会った当初の記憶がハッキリ残った",
            "リフレッシュしたい時の",
            "ストレスを爆散させてくれる"
        ]
    }
}