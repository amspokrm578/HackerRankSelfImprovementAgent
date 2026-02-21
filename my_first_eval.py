from braintrust import Eval

Eval(
    "My Project",
    data=lambda: [
        # Replace with your dataset
        {
            "input": "Hello",
            "expected": "Hi there!",
        },
    ],
    task=lambda input: "Your model response here"  # Replace with your LLM call,
    scores=[],
    max_concurrency=10,
)