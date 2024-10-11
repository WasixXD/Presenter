# Presenter
## Present Slides on the Terminal 
![image](https://github.com/user-attachments/assets/b47e03d1-ae49-42bd-a721-73048e02e6f1)
**Download the app!**

# Brief 📖
Training React Native!

# Challenges 🐢
- Connect server to mobile
- React Native
- Read slides
- Control presentation via phone

# Goals 🏆
- Installable apk
- Can create slides using markdown
- Can present and control via phone


# How to install 🚀

- Be sure to have nodejs >= 20

```bash
git clone https://github.com/WasixXD/Presenter
cd Presenter
cd server
npm install
npm install -g .
```

# How to use 👷

### Without phone
```bash
presenter --path <path to your slide>
```
Use `b` to go back one slide and `n` to go to the next

### Control via phone

## NOTE
If you want to control via phone please be sure to have a environment key called NGROK_TOKEN with your token from ngrok and have the [apk](https://github.com/WasixXD/Presenter/releases/tag/1.0.0) installed\
Don't know what this is? Create an account on [ngrok](https://dashboard.ngrok.com/login)



```bash
presenter --path <path to your slide> --web
```

# Creating slides 🛝

To create a presentation, follow these steps:

1) Create a Markdown File: Start by creating a file with a .md extension. This file will contain the content of your presentation.

2) Structure Your Slides: In the Markdown file, write the content for your slides. Use headings (e.g., # Slide Title) to define each slide's title.

3) Separate Slides: To add more slides, use a separator line made of three underscores (___). This line indicates the end of one slide and the beginning of another.

**Example**

```md
# Slide 1 Title
This is the content for the first slide.

___

# Slide 2 Title
This is the content for the second slide.

___

# Slide 3 Title
This is the content for the third slide.
```


# ▶️ DEMO

![image](https://github.com/user-attachments/assets/b9eabc40-ad92-40c1-8875-740fe5e24eac)

![image](https://github.com/user-attachments/assets/dd604f94-ba75-4b23-aea9-45183dd19d85)

![Screenshot_2024-10-11-17-17-01-052-edit_com anonymous presenter](https://github.com/user-attachments/assets/f098b86b-dcd8-441c-95c8-f39bfe5dc36b)


