// Fallback using docx library to create a simple, clean document
export async function generateDirectDocx(suggestions) {
  const { Document, Packer, Paragraph, HeadingLevel, TextRun } = window.docx;
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({ text: 'Profile', heading: HeadingLevel.HEADING_1 }),
        ...((suggestions.profile||[]).map(t => new Paragraph(t))),
        new Paragraph({ text: 'Key Skills', heading: HeadingLevel.HEADING_1 }),
        new Paragraph((suggestions.keySkills||[]).join(', ')),
        ...((suggestions.experience||[]).flatMap(e => [
          new Paragraph({ text: e.role, heading: HeadingLevel.HEADING_1 }),
          ...((e.bullets||[]).map(b => new Paragraph({ children:[ new TextRun({ text: '• ' }), new TextRun(b) ] })))
        ])),
        new Paragraph({ text: 'Education', heading: HeadingLevel.HEADING_1 }),
        ...((suggestions.education||[]).map(t => new Paragraph(t))),
        new Paragraph({ text: 'Additional', heading: HeadingLevel.HEADING_1 }),
        ...((suggestions.additional||[]).map(t => new Paragraph(t)))
      ]
    }]
  });
  const blob = await Packer.toBlob(doc);
  return blob;
}
