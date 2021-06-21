-- serial is the "old" implementation of auto-generated unique values that has been part of Postgres for ages. However that is not part of the SQL standard.
-- To be more compliant with the SQL standard, Postgres 10 introduced the syntax using generated as identity.
-- It is recommended to use the new identity syntax rather than serial.
-- https://stackoverflow.com/questions/55300370/postgresql-serial-vs-identity
-- DONE 2021-06-20

-- Note
-- 1. put a few data to test it first and put more data later if working.

create table medicine
(
	medicine_id  int generated always as identity primary key,
	medicine_name varchar(255) not null,
	medicine_type smallint not null, -- 1: brand, 0: generic
	generic_name varchar(255),
	brand_name varchar(255),
	alternative_medicine_ids int[], -- store multiple medicine_ids into the array
	warnings text, --it's different from each medicine
	what_is_this text,
	before_taking_this text,
	how_to_take_this text,
	what_happens_if_a_dose_missed text,
	what_happens_if_overdosed text,
	what_should_avoid_while_taking_this text,
	side_effects text, -- include common effects
	more_side_effects_in_details text,
	what_other_drugs_wil_affect text,
	other_drug_interactions_in_detail text,
	during_pregnancy text,
	during_breastfeeding text,
	dosage_forms varchar(255),
	eye_condition_ids int[], -- array of eye_condition_ids, mapping to the corresponding eye conditions
	data_reference_urls varchar(255)[]	
);

-- DONE 2021-06-20
create table medicine_image
(
	medicine_image_id int generated always as identity primary key,
	medicine_image_local_path varchar(255) not null,
	medicine_id int references medicine(medicine_id) not null -- one medicine id will have more than one image
);

-- DONE 2021-06-20
--create table medicine_dosage_form
--(
	--medicine_dosage_form_id smallint primary key, -- not serial but manual
	--medicine_dosage_form_type varchar(255) not null -- tablet, capsule, modified-release capsules
--);

create table eye_condition -- eye problems
(
	eye_condition_id int generated always as identity primary key,
	medicine_ids int[], -- mapping to medicines with this eye conditions
	name varchar(255) not null, -- disease name
	alternative_names varchar(255)[], -- other names 
	what_is_this text,
	symptoms text,
	causes text,
	risk_factors text,
	complications text,
	diagnosis text,
	treatment text,
	preparing_for_an_appointment_id int references eye_condition_preparing_for_an_appointment(preparing_for_an_appointment_id),
	data_reference_urls varchar(255)[]
);


-- --------------------------------------------------
-- Expand if more information is required later
-- --------------------------------------------------
create table eye_condition_more_information
(
	eye_condition_id int references eye_condition(eye_condition_id)
);

create table eye_condition_image
(
	eye_condition_image_id int generated always as identity primary key,
	eye_condition_image_local_path varchar(255) not null,
	eye_condition_id int references eye_condition(eye_condition_id) not null -- one eye_condition_id will have more than one image
);
create table eye_condition_preparing_for_an_appointment 
(
	preparing_for_an_appointment_id int generated always as identity primary key,
	head_description text,
	what_you_can_do text,
	what_to_expect_from_your_eye_doctor text
);