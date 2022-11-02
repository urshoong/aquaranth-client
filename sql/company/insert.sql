# error code 1366
ALTER TABLE company
    COLLATE='utf8mb4_general_ci',
    CONVERT TO CHARSET utf8mb4;

insert into company (company_name, company_address, company_tel, owner_name, company_category, business_status,
                     founding_date, opening_date, closing_date, default_domain, corporation, business_number)
values ('DOUZONE', -- 회사이름
        '강원도 순천시 남산면 수동리 749', -- 회사주소
        '02-6233-3000', -- 대표전화
        '김용우', -- 대표자명
        'erp', -- 종목
        'IT', -- 업태
        '2003-06-01', -- 설립일
        '2003-06-01', -- 개업일
        null, -- 폐업일
        'douzone.com', -- 기본도메인
        '법인', -- 개인법인여부
        '134-81-08473' -- 사업자번호
       );

insert into company (company_name, company_address, company_tel, owner_name, company_category, business_status,
                     founding_date, opening_date, closing_date, default_domain, corporation, business_number)
values ('KAKAO', -- 회사이름
        '제주특별자치도 제주시 첨단로 242', -- 회사주소
        '1577-3321', -- 대표전화
        '홍은택', -- 대표자명
        'platform', -- 종목
        'IT', -- 업태
        '1995-02-01', -- 설립일
        '1995-02-01', -- 개업일
        null, -- 폐업일
        'kakao.com', -- 기본도메인
        '법인', -- 개인법인여부
        '120-81-41578' -- 사업자번호
       );

select *
from company;













insert into company (company_name, company_address, company_tel, owner_name, founding_date, business_number)values(
    'CJ',
    '서울특별시 중구 소월로2길 12',
    '02-726-8114',
    '손경식',
    '1953-08-01',
    '104-81-29553'
);

insert into company (company_name, company_address, company_tel, owner_name, founding_date, business_number)values(
    'COUPANG',
    '서울특별시 송파구 송파대로 570',
    '1577-7011',
    '강한승',
    '2013-07-01',
    '120-88-03579'
);

insert intocompany (company_name, company_address, company_tel, owner_name, founding_date, business_number)values(
    'MEGAZONE',
    '서울 강남구 논현로85길 46',
    '02-2109-2500',
    '장지황',
    '2001-03-01',
    '214-86-79342'
);
