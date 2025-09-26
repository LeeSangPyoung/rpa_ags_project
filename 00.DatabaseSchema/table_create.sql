-- Name: rpa_step id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rpa_step ALTER COLUMN id SET DEFAULT nextval('public.rpa_step_id_seq'::regclass);


--
-- TOC entry 4754 (class 2604 OID 17457)
-- Name: rpa_step_execution id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rpa_step_execution ALTER COLUMN id SET DEFAULT nextval('public.rpa_step_execution_id_seq'::regclass);


--
-- TOC entry 4757 (class 2604 OID 17458)
-- Name: rpa_step_instance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rpa_step_instance ALTER COLUMN id SET DEFAULT nextval('public.rpa_step_instance_id_seq'::regclass);


--
-- TOC entry 4760 (class 2604 OID 17459)
-- Name: rpa_step_param_in_template id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rpa_step_param_in_template ALTER COLUMN id SET DEFAULT nextval('public.rpa_step_param_in_template_id_seq'::regclass);


--
-- TOC entry 4763 (class 2604 OID 17460)
-- Name: rpa_step_param_out id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rpa_step_param_out ALTER COLUMN id SET DEFAULT nextval('public.rpa_step_param_out_id_seq'::regclass);


--
-- TOC entry 4765 (class 2604 OID 17461)
-- Name: rpa_task_queue id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rpa_task_queue ALTER COLUMN id SET DEFAULT nextval('public.rpa_task_queue_id_seq'::regclass);


--
-- TOC entry 4972 (class 0 OID 17368)
-- Dependencies: 215
-- Data for Name: rpa_account; Type: TABLE DATA; Schema: public; Owner: postgres
--
