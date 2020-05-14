from flask import Flask, render_template,request

# for text Statistics
import textstat
textstat.set_lang('en')

# for text summarization
from sumy.utils import get_stop_words
from sumy.nlp.stemmers import Stemmer
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer as sumytoken
from sumy.summarizers.lex_rank import LexRankSummarizer
LANGUAGE = "english"
stemmer = Stemmer(LANGUAGE)

app = Flask(__name__)

def lexrank_summarizer(text, stemmer, LANGUAGE, SENTENCES_COUNT):
    parser = PlaintextParser.from_string((text), sumytoken(LANGUAGE))
    summarizer_LexRank = LexRankSummarizer(stemmer)
    summarizer_LexRank.stop_words = get_stop_words(LANGUAGE)
    sentences = []
    for sentence in summarizer_LexRank(parser.document, SENTENCES_COUNT):
        a = sentence
        sentences.append(str(a))
    return " ".join(sentences)


rich_text = ""
flu = 0
ease = ""

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/find/<text>')
def analyze(text):
    global rich_text
    global flu
    global ease

    rich_text =text
    flu = textstat.flesch_reading_ease(text)

    if(flu >90):
        ease = "Very Easy"
    elif(flu>80):
        ease = "Easy"
    elif(flu>70):
        ease = "Fairly Easy"
    elif(flu>60):
        ease = "Standard"
    elif(flu>50):
        ease = "Fairly difficult"
    elif(flu>30):
        ease= "Difficult"
    else:
        ease="Very confusing"
    return render_template('preview.html',ease=ease,flu=flu)

@app.route('/stats')
def stats():
    return render_template('preview.html',ease=ease,flu=flu)

@app.route('/summary')
def sum():
    text_list = rich_text.split('.')
    SENTENCES_COUNT = len(text_list)/2  # reducing length by 50%

    # lexrank_summary = sumy_Lex_summarize.lexrank_summarizer(text, stemmer, LANGUAGE, SENTENCES_COUNT)
    lexrank_summary = lexrank_summarizer(rich_text, stemmer, LANGUAGE, SENTENCES_COUNT)

    return render_template('summary.html',lexrank_summary=lexrank_summary)

if __name__ == "__main__":
	app.run(debug=True)
