from flask import Flask, render_template,request
import textstat
textstat.set_lang('en')

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

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
    return render_template('preview.html',ease=ease,flu=flu)

if __name__ == "__main__":
	app.run(debug=True)
