Pages :

id
name
slug
sequence


Home :

id
metatitle
metadescription
metatags
metaimage

headertitle
header description
headerbuttonlink
headerbuttonlable
headerbgimage

bottomsectiontitle
bottomsectiondescription
bottomsectionimage



CREATE TABLE Home (
    id INT,
    metatitle VARCHAR(255),
    metadescription TEXT,
    metatags TEXT,
    metaimage VARCHAR(255),
    
    headertitle VARCHAR(255),
    headerdescription TEXT,
    headerbuttonlabel VARCHAR(255),
    headerbuttonlink VARCHAR(255),
    headerbgimage VARCHAR(255),
    
    bottomsectiontitle VARCHAR(255),
    bottomsectiondescription TEXT,
    bottomsectionimage VARCHAR(255),
    
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES pages(id)
);

-----------------------------------------------------------------

About :

id
metatitle
metadescription
metatags
metaimage

headertitle
headerdescription
headerbgimage

section1title
section1description
section1image
section1buttonlabel
section1buttonlink
section1yearsofexperience


section2title
section2description

CREATE TABLE About (
    id INT,
    metatitle VARCHAR(255),
    metadescription TEXT,
    metatags TEXT,
    metaimage VARCHAR(255),

    headertitle VARCHAR(255),
    headerdescription TEXT,
    headerbgimage VARCHAR(255),

    section1title VARCHAR(255),
    section1description TEXT,
    section1image VARCHAR(255),
    section1buttonlabel VARCHAR(255),
    section1buttonlink VARCHAR(255),
    section1yearsofexperience INT,

    section2title VARCHAR(255),
    section2description TEXT,

    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES pages(id)
);

-----------------------------------------------------------------
CREATE TABLE AboutUsSectiontwoCards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    about_id INT,
    count INT,
    icon VARCHAR(255),
    text TEXT,
    FOREIGN KEY (about_id) REFERENCES About(id)
);

AboutUsSectiontwoCards :

id
about_id
count
icon
text

-----------------------------------------------------------------


Services :

id
metatitle
metadescription
metatags
metaimage

name
slug

headertitle
headerdescription
headerbuttonlable
headerbuttonlink
headerbgimage

section1title
section1description
section1image
section1buttonlabel
section1buttonlink
section1yearsofexperience

section2title
section2description


CREATE TABLE Services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    metatitle VARCHAR(255),
    metadescription TEXT,
    metatags TEXT,
    metaimage VARCHAR(255),
    name VARCHAR(255),
    slug VARCHAR(255),
    headertitle VARCHAR(255),
    headerdescription TEXT,
    headerbuttonlabel VARCHAR(255),
    headerbuttonlink VARCHAR(255),
    headerbgimage VARCHAR(255),
    section1title VARCHAR(255),
    section1description TEXT,
    section1image VARCHAR(255),
    section1buttonlabel VARCHAR(255),
    section1buttonlink VARCHAR(255),
    section1yearsofexperience INT,
    section2title VARCHAR(255),
    section2description TEXT
);

-----------------------------------------------------------------


Resources :

id
metatitle
metadescription
metatags
metaimage

headertitle
headerdescription
headerbuttonlabel
headerbuttonlink
headerbgimage

title
content

-----------------------------------------------------------------


Faqs :

id
metatitle
metadescription
metatags
metaimage

headertitle
headerdescription
headerbuttonlable
headerbuttonlink
headerbgimage

title
	
image

-----------------------------------------------------------------


faq_question_answers :

id
faq_id
question
answer

-----------------------------------------------------------------


Testimonials :

id
name
position
image
review_text

