from flask import Flask
import textstat
textstat.set_lang('en')

app = Flask(__name__)

@app.route('/')
def fun():
    return ("This is the home page of the Chrome Extension")

@app.route('/find/<text>')
def analyze(text):
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
    return ("<H2>Your document is {} to read with score of {} out of 100</H2>".format(ease,flu))

if __name__ == "__main__":
	app.run(debug=True)
