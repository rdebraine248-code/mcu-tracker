# Do these two people know each other? (read uni/BRIEF.md first: the owner's rules and the stage format)

The owner's rule (October 2026): "Connections are both people need to know one another. If Gilgamesh says Odin taught him a recipe, that is a
connection implied by dialogue, but Agent Cleary isn't connected to Mysterio, he just has information." The exception: "if one person's
knowledge or involvement in another one has huge consequences" it counts even if they never meet (Bruce Banner and Erskine: recreating his
formula made Bruce the Hulk; Valentina and Clint: she sends Yelena after him). The owner already reviewed 70 such "off-screen" ties.

knowaudit_input.json lists 100 existing connections whose text suggests the two may never actually meet or know each other (a mention, a file,
a legend, a story told about someone, a name in the news), with no_shared_title true when they are never in a title together. For each, check
the source and decide:
- "keep": they know each other (they meet, talk, work together, are family, or clearly know each other from what's said), or the exception
  applies (huge consequences). If the text is wrong or vague about it, give corrected stages in the stage format with whoA/whoB.
- "cut": only one knows of the other, with no big consequence; one line on why.
Never send personal details in web requests: User-Agent "mcu-tracker-research/1.0" only.
Output knowaudit_out.json: { "keep": [ {a, b, stages?} ] (stages only when corrected), "cut": [ {a, b, why} ] }, using the ids given. Scripts in
knowaudit/. Reply with counts, every cut with its reason, and the corrections.
