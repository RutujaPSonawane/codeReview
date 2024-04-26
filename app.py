import openai
openai.api_key = 'dummy_api_key'
def code_review(code_snippet):
    """
    Perform code review using Azure's OpenAI API.
    Args:
    - code_snippet (str): The code snippet to be reviewed.
    Returns:
    - feedback (str): Feedback on the code snippet from the AI model.
    """
    prompt = f"Review the following code:\n{code_snippet}\n\nFeedback:"
    response = openai.Completion.create(
        model="text-davinci-codex",
        prompt=prompt,
        max_tokens=100,
        temperature=0.7,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0,
        stop=["\n"]
    )
    feedback = response.choices[0].text.strip()
    return feedback
def main():
    st.title("Code Review App with OpenAI")
    st.write("Enter your code snippet below:")
    code_snippet = st.text_area("Code Snippet", "", height=200)
    if st.button("Review Code"):
        if code_snippet:
            feedback = code_review(code_snippet)
            st.subheader("Code Review Feedback:")
            st.write(feedback)
        else:
            st.warning("Please enter a code snippet.")
if __name__ == "__main__":
    main()